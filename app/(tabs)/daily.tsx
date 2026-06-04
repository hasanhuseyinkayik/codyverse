import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ActivityIndicator, Alert, TextInput
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/constants/api';
import { WebView } from 'react-native-webview';
import { useRef } from 'react';

export default function DailyScreen() {
  const { token } = useAuth();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [solved, setSolved] = useState(false);
  const webviewRef = useRef<WebView>(null);

  const fetchDaily = async () => {
    try {
      const data = await api.get('/daily/', token!);
      setChallenge(data);
      setSolved(data.is_solved);
      setCode(data.starter_code ?? '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDaily();
    }, [])
  );

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
                  import sys, io
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
      const data = await api.post('/daily/complete/', { output: result }, token!);
      if (data.correct) {
        setSolved(true);
        Alert.alert(
          '🎉 Harika!',
          `Günün sorusunu çözdün! +50 XP kazandın. Serin: ${data.streak} gün`,
          [{ text: 'Süper!', style: 'default' }]
        );
      } else {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFCC" />
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Bugün için soru bulunamadı.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Gizli Pyodide Motoru */}
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

      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Günün Sorusu</Text>
        <View style={[styles.difficultyBadge,
          challenge.difficulty === 'easy' && styles.easy,
          challenge.difficulty === 'medium' && styles.medium,
          challenge.difficulty === 'hard' && styles.hard,
        ]}>
          <Text style={styles.difficultyText}>
            {challenge.difficulty === 'easy' ? 'Kolay' : challenge.difficulty === 'medium' ? 'Orta' : 'Zor'}
          </Text>
        </View>
      </View>

      {/* Çözüldü Banner */}
      {solved && (
        <View style={styles.solvedBanner}>
          <Text style={styles.solvedText}>✅ Bugünün sorusunu çözdün!</Text>
        </View>
      )}

      {/* Soru */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{challenge.question}</Text>
      </View>

      {/* Editör */}
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
          editable={!solved}
        />
      </View>

      {/* Çalıştır */}
      <TouchableOpacity
        style={[styles.button, (!isReady || solved) && styles.buttonDisabled]}
        onPress={runCode}
        disabled={!isReady || solved}
      >
        <Text style={styles.buttonText}>
          {solved ? '✅ TAMAMLANDI' : isReady ? '▶  KODU ÇALIŞTIR' : 'LÜTFEN BEKLEYİN'}
        </Text>
      </TouchableOpacity>

      {/* Terminal */}
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
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#FF6B6B', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  difficultyBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  easy: { backgroundColor: '#00FFCC22', borderWidth: 1, borderColor: '#00FFCC' },
  medium: { backgroundColor: '#FFB30022', borderWidth: 1, borderColor: '#FFB300' },
  hard: { backgroundColor: '#FF6B6B22', borderWidth: 1, borderColor: '#FF6B6B' },
  difficultyText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  solvedBanner: { backgroundColor: '#00FFCC22', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#00FFCC' },
  solvedText: { color: '#00FFCC', textAlign: 'center', fontWeight: '600' },
  questionBox: { backgroundColor: '#1E1E2E', borderRadius: 10, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#00FFCC' },
  questionText: { color: '#CCC', fontSize: 14, lineHeight: 22 },
  editorContainer: { flex: 2, backgroundColor: '#1E1E2E', borderRadius: 10, padding: 15, marginBottom: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 15, fontFamily: 'monospace', textAlignVertical: 'top' },
  button: { backgroundColor: '#00FFCC', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  buttonDisabled: { backgroundColor: '#333' },
  buttonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  consoleContainer: { flex: 1, backgroundColor: '#000', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#333' },
  consoleHeader: { color: '#888', fontSize: 12, marginBottom: 10 },
  consoleOutput: { color: '#00FFCC', fontSize: 14, fontFamily: 'monospace' },
});