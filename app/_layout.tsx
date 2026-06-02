import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === '(tabs)';
    if (!token && inAuthGroup) {
      router.replace('/login');
    } else if (token && !inAuthGroup) {
      router.replace('/(tabs)/');
    }
  }, [token, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, title: 'Ders', headerStyle: { backgroundColor: '#1E1E2E' }, headerTintColor: '#FFF' }} />
      <Stack.Screen name="editor" options={{ headerShown: true, title: 'Editör', headerStyle: { backgroundColor: '#1E1E2E' }, headerTintColor: '#FFF' }} />
      <Stack.Screen name="settings" options={{ headerShown: true, title: 'Ayarlar', headerStyle: { backgroundColor: '#1E1E2E' }, headerTintColor: '#FFF' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}