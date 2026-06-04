import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { api } from '@/constants/api';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await api.get('/profile/', token!);
      setProfile(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFCC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {profile?.username?.[0]?.toUpperCase() ?? '?'}
        </Text>
      </View>

      <Text style={styles.userName}>{profile?.username ?? '-'}</Text>
      <Text style={styles.university}>{profile?.university ?? ''}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile?.xp ?? 0}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile?.streak ?? 0}</Text>
          <Text style={styles.statLabel}>Günlük Seri</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', paddingTop: 50 },
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#1E1E2E', marginBottom: 20,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#00FFCC',
  },
  avatarText: { color: '#00FFCC', fontSize: 36, fontWeight: 'bold' },
  userName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  university: { color: '#888', fontSize: 14, marginTop: 5 },
  statsContainer: { flexDirection: 'row', marginTop: 30, gap: 20 },
  statBox: { backgroundColor: '#1E1E2E', padding: 20, borderRadius: 15, alignItems: 'center', minWidth: 100 },
  statNumber: { color: '#00FFCC', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12 },
  logoutButton: { marginTop: 40, backgroundColor: '#FF6B6B', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 40 },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});