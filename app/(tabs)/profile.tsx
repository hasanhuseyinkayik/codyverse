import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.userName}>{user?.username ?? 'Kullanıcı'}</Text>
      <Text style={styles.university}>{user?.university ?? ''}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user?.xp ?? 0}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user?.streak ?? 0}</Text>
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
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#333', marginBottom: 20 },
  userName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  university: { color: '#888', fontSize: 14, marginTop: 5 },
  statsContainer: { flexDirection: 'row', marginTop: 30, gap: 20 },
  statBox: { backgroundColor: '#1E1E2E', padding: 20, borderRadius: 15, alignItems: 'center', minWidth: 100 },
  statNumber: { color: '#00FFCC', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12 },
  logoutButton: { marginTop: 40, backgroundColor: '#FF6B6B', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 40 },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});