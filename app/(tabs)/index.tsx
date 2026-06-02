import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/constants/api';

export default function JourneyScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [progress, setProgress] = useState<Record<number, string>>({});
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [lessonsData, progressData] = await Promise.all([
        api.get('/lessons/', token!),
        api.get('/progress/', token!),
      ]);

      setLessons(lessonsData);

      const progressMap: Record<number, string> = {};
      progressData.forEach((item: any) => {
        progressMap[item.lesson.order] = item.status;
      });
      setProgress(progressMap);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFCC" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      {lessons.map((lesson, index) => {
        const status = progress[lesson.order] ?? 'locked';
        const isLocked = status === 'locked';

        return (
          <View key={lesson.id} style={styles.nodeWrapper}>
            <TouchableOpacity
              style={[
                styles.node,
                status === 'completed' && styles.completed,
                status === 'current' && styles.current,
                isLocked && styles.locked,
              ]}
              onPress={() => {
                if (!isLocked) {
                  router.push({ pathname: '/modal', params: { id: lesson.order } });
                } else {
                  alert(`${lesson.title} dersi henüz kilitli!`);
                }
              }}
            >
              <Text style={styles.nodeText}>
                {status === 'completed' ? '✓' : lesson.order}
              </Text>
            </TouchableOpacity>
            <Text style={styles.nodeTitle}>{lesson.title}</Text>
            {index !== lessons.length - 1 && (
              <View style={[styles.line, !isLocked && styles.lineActive]} />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { alignItems: 'center', paddingVertical: 40 },
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  nodeWrapper: { alignItems: 'center', marginBottom: 20 },
  node: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  completed: { backgroundColor: '#00FFCC' },
  current: { backgroundColor: '#00FFCC' },
  locked: { backgroundColor: '#333' },
  nodeText: { fontSize: 24, fontWeight: 'bold', color: '#121212' },
  nodeTitle: { color: '#FFF', marginTop: 10, fontWeight: '500' },
  line: { width: 4, height: 40, backgroundColor: '#333', marginTop: 10 },
  lineActive: { backgroundColor: '#00FFCC' },
});