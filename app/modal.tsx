import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions, Image, Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LESSON_DATA } from '@/constants/Lessons';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = (width - 32) * (9 / 16);

type Tab = 'lesson' | 'video';

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = LESSON_DATA[id ?? '1'];
  const [activeTab, setActiveTab] = useState<Tab>('lesson');

  if (!lesson) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Ders bulunamadı.</Text>
      </View>
    );
  }

  const hasVideo = !!lesson.videoUrl;

  return (
    <View style={styles.container}>

      {/* Sekme Başlıkları */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'lesson' && styles.tabActive]}
          onPress={() => setActiveTab('lesson')}
        >
          <Text style={[styles.tabText, activeTab === 'lesson' && styles.tabTextActive]}>
            📖 Ders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'video' && styles.tabActive,
            !hasVideo && styles.tabDisabled
          ]}
          onPress={() => hasVideo && setActiveTab('video')}
          disabled={!hasVideo}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'video' && styles.tabTextActive,
            !hasVideo && styles.tabTextDisabled
          ]}>
            🎬 Video {!hasVideo && '(Yakında)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ders Sekmesi */}
      {activeTab === 'lesson' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.explanation}>{lesson.explanation}</Text>

          <View style={styles.challengeBox}>
            <Text style={styles.challengeTitle}>🎯 {lesson.challengeTitle}</Text>
            <Text style={styles.challengeText}>{lesson.challengeText}</Text>
          </View>

          <TouchableOpacity
            style={styles.codeButton}
            onPress={() => router.push({ pathname: '/editor', params: { id: lesson.id } })}
          >
            <Text style={styles.codeButtonText}>{'</>'} Kod Editörünü Aç</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Video Sekmesi */}
      {activeTab === 'video' && hasVideo && (
        <View style={styles.content}>
          <Text style={styles.videoLabel}>{lesson.title} — Video Ders</Text>

          <TouchableOpacity
            style={[styles.videoWrapper, { height: VIDEO_HEIGHT }]}
            onPress={() => {
              const videoId = lesson.videoUrl.split('/embed/')[1];
              Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
            }}
          >
            <Image
              source={{ uri: `https://img.youtube.com/vi/${lesson.videoUrl.split('/embed/')[1]}/hqdefault.jpg` }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <View style={styles.playOverlay}>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.videoHint}>
            💡 YouTube uygulaması üzerinden oynatılır.
          </Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  errorText: { color: '#FF6B6B', fontSize: 16 },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#00FFCC' },
  tabDisabled: { opacity: 0.4 },
  tabText: { color: '#888', fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: '#00FFCC', fontWeight: '700' },
  tabTextDisabled: { color: '#555' },

  content: { flex: 1 },
  contentPadding: { padding: 20 },
  title: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  explanation: { color: '#CCC', fontSize: 15, lineHeight: 24, marginBottom: 24 },

  challengeBox: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00FFCC',
    marginBottom: 24,
  },
  challengeTitle: { color: '#00FFCC', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  challengeText: { color: '#CCC', fontSize: 14, lineHeight: 22 },

  codeButton: {
    backgroundColor: '#00FFCC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  codeButtonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },

  videoLabel: { color: '#FFF', fontSize: 16, fontWeight: '600', padding: 16, paddingBottom: 8 },
  videoWrapper: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: '#FFF', fontSize: 28, marginLeft: 4 },
  videoHint: { color: '#555', fontSize: 12, textAlign: 'center', marginTop: 12 },
});