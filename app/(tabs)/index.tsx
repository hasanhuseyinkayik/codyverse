import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const modules = [
  { id: 1, title: 'Variables', status: 'completed' },
  { id: 2, title: 'Data Types', status: 'current' },
  { id: 3, title: 'Loops', status: 'locked' },
  { id: 4, title: 'Functions', status: 'locked' },
];

export default function JourneyScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      {modules.map((mod, index) => (
        <View key={mod.id} style={styles.nodeWrapper}>
          <TouchableOpacity
            style={[styles.node, mod.status === 'locked' && styles.locked]}
            onPress={() => {
              if (mod.status !== 'locked') {
                  // modül ID'si parametre olarak gönderilecek
                router.push({ pathname: '/modal', params: { id: mod.id } });
              } else {
                alert(`${mod.title} dersi henüz kilitli!`);
              }
            }}
          >
            <Text style={styles.nodeText}>{mod.id}</Text>
          </TouchableOpacity>
          <Text style={styles.nodeTitle}>{mod.title}</Text>
          {index !== modules.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { alignItems: 'center', paddingVertical: 40 },
  nodeWrapper: { alignItems: 'center', marginBottom: 20 },
  node: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#00FFCC', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  locked: { backgroundColor: '#333' },
  nodeText: { fontSize: 24, fontWeight: 'bold' },
  nodeTitle: { color: '#FFF', marginTop: 10, fontWeight: '500' },
  line: { width: 4, height: 40, backgroundColor: '#333', marginTop: 10 }
});