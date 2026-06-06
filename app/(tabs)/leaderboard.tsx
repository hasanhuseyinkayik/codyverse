import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/constants/api';

export default function LeaderboardScreen() {
  const { token, user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const result = await api.get('/leaderboard/', token!);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLeaderboard();
    }, [])
  );

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
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
      <Text style={styles.title}>🏆 Sıralama</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const isMe = item.username === user?.username;
          return (
            <View style={[styles.row, isMe && styles.myRow]}>
              <Text style={styles.rank}>{getMedal(index)}</Text>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.username[0].toUpperCase()}</Text>
              </View>
              <View style={styles.info}>
                <Text style={[styles.username, isMe && styles.myUsername]}>
                  {item.username} {isMe && '(Sen)'}
                </Text>
                <Text style={styles.university}>{item.university || 'Üniversite belirtilmemiş'}</Text>
              </View>
              <View style={styles.xpContainer}>
                <Text style={styles.xp}>{item.xp}</Text>
                <Text style={styles.xpLabel}>XP</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz sıralama verisi yok.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFF', fontSize: 22, fontWeight: 'bold', padding: 20, paddingBottom: 10 },
  list: { padding: 15 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1E1E2E', borderRadius: 12,
    padding: 14, marginBottom: 10,
  },
  myRow: { borderWidth: 1, borderColor: '#00FFCC' },
  rank: { color: '#FFF', fontSize: 18, fontWeight: 'bold', width: 36 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#333', justifyContent: 'center',
    alignItems: 'center', marginRight: 12,
  },
  avatarText: { color: '#00FFCC', fontSize: 16, fontWeight: 'bold' },
  info: { flex: 1 },
  username: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  myUsername: { color: '#00FFCC' },
  university: { color: '#888', fontSize: 12, marginTop: 2 },
  xpContainer: { alignItems: 'center' },
  xp: { color: '#00FFCC', fontSize: 18, fontWeight: 'bold' },
  xpLabel: { color: '#888', fontSize: 11 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 40 },
});