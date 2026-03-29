import { Tabs, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const router = useRouter();
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#00FFCC',
      headerStyle: { backgroundColor: '#1E1E2E' },
      headerTintColor: '#FFF',
      tabBarStyle: { backgroundColor: '#1E1E2E' }
    }}>
      {/* 1. Journey (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />
        }}
      />

      {/* 2. Daily Challenge (daily.tsx) */}
      <Tabs.Screen
        name="daily"
        options={{
          title: 'Daily Challenge',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />
        }}
      />

      {/* 3. Leaderboard (leaderboard.tsx) */}
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />
        }}
      />

      {/* 4. Profil (profile.tsx) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          // SAĞ ÜST BUTON BURADA:
          headerRight: () => (
            <Pressable onPress={() => router.push('/settings')} style={{ marginRight: 15 }}>
              <Ionicons name="settings-outline" size={24} color="#FFF" />
            </Pressable>
          )
        }}
      />

      {/* İstemediğin 'two.tsx' sekmesini burada tanımlamazsan çubuktan kalkacaktır */}
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}