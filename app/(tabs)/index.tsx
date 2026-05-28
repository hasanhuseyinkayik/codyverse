import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { moduleProgressStore } from '@/constants/ProgressStore';

const modules = [
  { id: 1,  title: 'Print' },
  { id: 2,  title: 'Değişkenler' },
  { id: 3,  title: 'Veri Tipleri' },
  { id: 4,  title: 'Operatörler' },
  { id: 5,  title: 'Stringler' },
  { id: 6,  title: 'Girdi Alma' },
  { id: 7,  title: 'Koşullar' },
  { id: 8,  title: 'For Döngüsü' },
  { id: 9,  title: 'While Döngüsü' },
  { id: 10, title: 'Listeler' },
  { id: 11, title: 'Fonksiyonlar' },
  { id: 12, title: 'Sözlükler' },
  { id: 13, title: 'String Formatlama' },
  { id: 14, title: 'List Comprehension' },
  { id: 15, title: 'Hata Yönetimi' },
  { id: 16, title: 'Dosya İşlemleri' },
];

export default function JourneyScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(moduleProgressStore.getProgress());

  // Ekrana her dönüşte progress'i yeniden oku
  useFocusEffect(
    useCallback(() => {
      setProgress(moduleProgressStore.getProgress());
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      {modules.map((mod, index) => {
        const status = progress[mod.id] ?? (mod.id === 1 ? 'current' : 'locked');
        const isLocked = status === 'locked';

        return (
          <View key={mod.id} style={styles.nodeWrapper}>
            <TouchableOpacity
              style={[
                styles.node,
                status === 'completed' && styles.completed,
                status === 'current' && styles.current,
                isLocked && styles.locked,
              ]}
              onPress={() => {
                if (!isLocked) {
                  router.push({ pathname: '/modal', params: { id: mod.id } });
                } else {
                  alert(`${mod.title} dersi henüz kilitli!`);
                }
              }}
            >
              <Text style={styles.nodeText}>
                {status === 'completed' ? '✓' : mod.id}
              </Text>
            </TouchableOpacity>
            <Text style={styles.nodeTitle}>{mod.title}</Text>
            {index !== modules.length - 1 && (
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
  nodeWrapper: { alignItems: 'center', marginBottom: 20 },
  node: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', elevation: 5
  },
  completed: { backgroundColor: '#00FFCC' },
  current: { backgroundColor: '#00FFCC' },
  locked: { backgroundColor: '#333' },
  nodeText: { fontSize: 24, fontWeight: 'bold', color: '#121212' },
  nodeTitle: { color: '#FFF', marginTop: 10, fontWeight: '500' },
  line: { width: 4, height: 40, backgroundColor: '#333', marginTop: 10 },
  lineActive: { backgroundColor: '#00FFCC' },
});