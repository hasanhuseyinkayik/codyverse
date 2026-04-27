import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profil Fotoğrafı Alanı */}
      <View style={styles.avatarPlaceholder} />

      <Text style={styles.userName}>Hasan Hüseyin Kayık</Text>
      <Text style={styles.university}>Ankara Üniversitesi</Text>

      {/* İstatitstikler - Raporundaki Puanlama Sistemi */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1250</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Günlük Seri</Text>
        </View>
      </View>
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
  statLabel: { color: '#888', fontSize: 12 }
});