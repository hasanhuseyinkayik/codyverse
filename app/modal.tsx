import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Sunumda garanti çalışması için geçici veritabanı
const LESSON_DATA: Record<string, any> = {
  "1": {
    title: "Variables (Değişkenler)",
    explanation: "Programlamada değişkenler, bilgisayarın hafızasında verileri tuttuğumuz 'kutulardır'. \n\nÖrneğin bir oyundaki skoru veya kullanıcının adını bir değişkende saklarız. Python'da değişken oluşturmak çok kolaydır.",
    challengeTitle: "İlk Değişkenini Oluştur!",
    challengeText: "Koda geçtiğinde çalışma alanında 'number' adında bir değişken oluştur, ona 50 değerini ata ve print() komutuyla ekrana yazdır."
  },
  "2": {
    title: "Data Types (Veri Tipleri)",
    explanation: "Veriler her zaman sayılardan ibaret değildir. Metinler (String), ondalıklı sayılar (Float) ve doğru/yanlış bildiren (Boolean) tipler vardır.",
    challengeTitle: "Kendi Adını Yazdır",
    challengeText: "Koda geçtiğinde 'isim' adında bir değişken oluşturup kendi adını metin olarak ata ve ekrana yazdır."
  }
};

export default function ModalScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const lesson = LESSON_DATA[id as string] || LESSON_DATA["1"];
  const [step, setStep] = useState('explanation');

  return (
    <SafeAreaView style={styles.container}>
      {step === 'explanation' ? (
        // 1. AŞAMA: DERS İÇERİĞİ
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DERS İÇERİĞİ</Text>
          </View>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.text}>{lesson.explanation}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setStep('challenge')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Anladım, Göreve Geç</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 2. AŞAMA: CHALLENGE (GÖREV)
        <View style={styles.card}>
          <View style={[styles.badge, { backgroundColor: '#FF007F20' }]}>
            <Text style={[styles.badgeText, { color: '#FF007F' }]}>GÖREV</Text>
          </View>
          <Text style={styles.title}>🎯 {lesson.challengeTitle}</Text>
          <Text style={styles.text}>{lesson.challengeText}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setStep('explanation')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Geri</Text>
            </TouchableOpacity>

            {/* 3. AŞAMA: EDİTÖRE YÖNLENDİRME (EXPO ROUTER BURADA) */}
            <TouchableOpacity
              style={[styles.primaryButton, { flex: 2 }]}
              onPress={() => {
                router.push({ pathname: '/editor', params: { id: id } });
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Koda Geç</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A12', // Daha derin, koyu bir arka plan
    padding: 20,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#161622', // Kart arka planı
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#00FFCC40', // Yarı saydam neon kenarlık
    // Kart gölgesi (Neon hissi için)
    shadowColor: '#00FFCC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10
  },
  badge: {
    backgroundColor: '#00FFCC20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16
  },
  badgeText: {
    color: '#00FFCC',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: 0.5
  },
  text: {
    color: '#A0A0B0', // Göz yormayan gri/mavi metin
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 40
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12
  },
  primaryButton: {
    backgroundColor: '#00FFCC',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFCC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4
  },
  primaryButtonText: {
    color: '#0A0A12',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#232533',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  }
});