import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/constants/api';

type User = {
  id: number;
  username: string;
  email: string;
  university: string;
  xp: number;
  streak: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<string | null>;
  register: (username: string, password: string, email: string, university: string) => Promise<string | null>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama açılınca token var mı kontrol et
  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedUser = await AsyncStorage.getItem('user');
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await api.post('/auth/login/', { username, password });
      if (data.access) {
        await AsyncStorage.setItem('token', data.access);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.access);
        setUser(data.user);
        return null; // başarılı
      }
      return data.error ?? 'Giriş başarısız';
    } catch (e) {
      return 'Sunucuya bağlanılamadı';
    }
  };

  const register = async (username: string, password: string, email: string, university: string) => {
    try {
      const data = await api.post('/auth/register/', { username, password, email, university });
      if (data.access) {
        await AsyncStorage.setItem('token', data.access);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.access);
        setUser(data.user);
        return null; // başarılı
      }
      return JSON.stringify(data) ?? 'Kayıt başarısız';
    } catch (e) {
      return 'Sunucuya bağlanılamadı';
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);