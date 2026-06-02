import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre gerekli');
      return;
    }
    setLoading(true);
    const error = await register(username, password, email, university);
    setLoading(false);
    if (error) {
      Alert.alert('Kayıt Başarısız', error);
    } else {
      router.replace('/(tabs)/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.logo}>{'<>'}</Text>
        <Text style={styles.title}>Codyverse</Text>
        <Text style={styles.subtitle}>Hesap Oluştur</Text>

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı adı *"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Üniversite"
          placeholderTextColor="#888"
          value={university}
          onChangeText={setUniversity}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre *"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#121212" />
            : <Text style={styles.buttonText}>Kayıt Ol</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Zaten hesabın var mı? <Text style={styles.linkBold}>Giriş Yap</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  inner: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 40 },
  logo: { color: '#00FFCC', fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  input: {
    backgroundColor: '#1E1E2E',
    color: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#00FFCC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: '#333' },
  buttonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#888', textAlign: 'center', fontSize: 14 },
  linkBold: { color: '#00FFCC', fontWeight: 'bold' },
});