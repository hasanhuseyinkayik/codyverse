import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/constants/api';

export default function EditorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [code, setCode] = useState('# Kodunuzu buraya yazın\n');
  const [output, setOutput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await api.get('/lessons/', token!);
        const found = data.find((l: any) => l.order === Number(id));
        if (found) {
          setLesson(found);
          setCode(found.starter_code ?? '# Kodunuzu buraya yazın\n');
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchLesson();
  }, [id]);

  const pyodideHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
    </head>
    <body>
      <script>
        async function main() {
          try {
            let pyodide = await loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
            });
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'status', data: 'ready' }));
            window.addEventListener('message', async function(event) {
              try {
                await pyodide.runPythonAsync(\`
                  import sys
                  import io
                  sys.stdout = io.StringIO()
                \`);
                await pyodide.runPythonAsync(event.data);
                let output = pyodide.runPython("sys.stdout.getvalue()");
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'output', data: output }));
              } catch (err) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: err.toString() }));
              }
            });
            document.addEventListener('message', function(event) {
               window.dispatchEvent(new MessageEvent('message', {data: event.data}));
            });
          } catch (err) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: 'Motor Yükleme Hatası: ' + err.toString() }));
          }
        }
        main();
      </script>
    </body>
    </html>
  `;

  const handleMessage = async (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.type === 'status' && message.data === 'ready') {
      setIsReady(true);
      setOutput('');
    } else if (message.type === 'output') {
      const result = message.data.trim();
      setOutput(result);

      const expected = lesson?.expected_output?.trim();
      if (expected && result === expected) {
        // API'ye tamamlandı bildir
        await api.post(`/lessons/${lesson.id}/complete/`, {}, token!);
        Alert.alert(
          '🎉 Harika!',
          'Doğru çıktıya ulaştın! Bir sonraki ders açıldı.',
          [{ text: 'Devam Et', onPress: () => router.push('/(tabs)/') }]
        );
      } else if (expected && result !== expected) {
        Alert.alert(
          '❌ Tekrar Dene',
          'Çıktın beklenenle eşleşmiyor. Lütfen tekrar deneyiniz.',
          [{ text: 'Tamam', style: 'default' }]
        );
      }
    } else if (message.type === 'error') {
      setOutput(message.data);
    }
  };

  const runCode = () => {
    if (isReady && webviewRef.current) {
      setOutput('Kod çalıştırılıyor...');
      webviewRef.current.postMessage(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 0, width: 0, opacity: 0 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: pyodideHtml, baseUrl: 'https://cdn.jsdelivr.net' }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Çalışma Alanı</Text>
        {!isReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#00FFCC" />
            <Text style={styles.loadingText}>Motor Başlatılıyor...</Text>
          </View>
        )}
      </View>

      {lesson && (
        <View style={styles.challengeBox}>
          <Text style={styles.challengeTitle}>🎯 {lesson.challenge_title}</Text>
          <Text style={styles.challengeText}>{lesson.challenge_text}</Text>
        </View>
      )}

      <View style={styles.editorContainer}>
        <TextInput
          style={styles.input}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          value={code}
          onChangeText={setCode}
          placeholder="Kodunuzu buraya yazın..."
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isReady && styles.buttonDisabled]}
        onPress={runCode}
        disabled={!isReady}
      >
        <Text style={styles.buttonText}>
          {isReady ? '▶  KODU ÇALIŞTIR' : 'LÜTFEN BEKLEYİN'}
        </Text>
      </TouchableOpacity>

      <View style={styles.consoleContainer}>
        <Text style={styles.consoleHeader}>Terminal</Text>
        <Text style={styles.consoleOutput}>
          {output ? output : '>_ Çıktı bekleniyor...'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  headerText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loadingText: { color: '#00FFCC', fontSize: 12 },
  challengeBox: { backgroundColor: '#1E1E2E', borderRadius: 10, padding: 14, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#00FFCC' },
  challengeTitle: { color: '#00FFCC', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  challengeText: { color: '#CCC', fontSize: 13, lineHeight: 20 },
  editorContainer: { flex: 2, backgroundColor: '#1E1E2E', borderRadius: 10, padding: 15, marginBottom: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 15, fontFamily: 'monospace', textAlignVertical: 'top' },
  button: { backgroundColor: '#00FFCC', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  buttonDisabled: { backgroundColor: '#333' },
  buttonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  consoleContainer: { flex: 1, backgroundColor: '#000', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#333' },
  consoleHeader: { color: '#888', fontSize: 12, marginBottom: 10 },
  consoleOutput: { color: '#00FFCC', fontSize: 14, fontFamily: 'monospace' },
});