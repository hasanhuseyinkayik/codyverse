import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function EditorScreen() {
  const [code, setCode] = useState('print("Merhaba Codyverse!")\n\nfor i in range(3):\n    print(f"Döngü: {i}")');
  const [output, setOutput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const webviewRef = useRef<WebView>(null);

  // GÜNCELLENEN KISIM: Hata yakalama ve indexURL eklendi
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
            // İndirme adresi açıkça belirtildi
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
            // Eğer motor yüklenemezse React Native'e hatayı gönder
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: 'Motor Yükleme Hatası: ' + err.toString() }));
          }
        }
        main();
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.type === 'status' && message.data === 'ready') {
      setIsReady(true);
      setOutput(''); // Hazır olduğunda terminali temizle
    } else if (message.type === 'output' || message.type === 'error') {
      setOutput(message.data);
    }
  };

  const runCode = () => {
    if (isReady && webviewRef.current) {
      setOutput('Motor kodu işliyor...');
      webviewRef.current.postMessage(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 0, width: 0, opacity: 0 }}>
        {/* GÜNCELLENEN KISIM: baseUrl ve domStorageEnabled eklendi */}
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

      <View style={styles.editorContainer}>
        <TextInput
          style={styles.input}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          value={code}
          onChangeText={setCode}
          placeholder="Python kodunuzu yazın..."
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isReady && styles.buttonDisabled]}
        onPress={runCode}
        disabled={!isReady}
      >
        <Text style={styles.buttonText}>
          {isReady ? 'RUN CODE' : 'LÜTFEN BEKLEYİN'}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  headerText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loadingText: { color: '#00FFCC', fontSize: 12 },
  editorContainer: { flex: 2, backgroundColor: '#1E1E2E', borderRadius: 10, padding: 15, marginBottom: 15 },
  input: { flex: 1, color: '#FFF', fontSize: 16, fontFamily: 'monospace', textAlignVertical: 'top' },
  button: { backgroundColor: '#00FFCC', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  buttonDisabled: { backgroundColor: '#333' },
  buttonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  consoleContainer: { flex: 1, backgroundColor: '#000', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#333' },
  consoleHeader: { color: '#888', fontSize: 12, marginBottom: 10 },
  consoleOutput: { color: '#00FFCC', fontSize: 14, fontFamily: 'monospace' }
});