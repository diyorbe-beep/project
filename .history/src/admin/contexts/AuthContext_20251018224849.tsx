import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, Staff } from '../../lib/api';

interface AuthContextType {
  user: Staff | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials for different roles (for demo purposes)
const USER_CREDENTIALS = {
  'admin@najotclinic.uz': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@najotclinic.uz',
      full_name: 'Administrator',
      role: 'admin' as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  'shifokor@najotclinic.uz': {
    password: 'shifokor123',
    user: {
      id: '2',
      email: 'shifokor@najotclinic.uz',
      full_name: 'Dr. Kamila Rahimova',
      role: 'shifokor' as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  'hamshira@najotclinic.uz': {
    password: 'hamshira123',
    user: {
      id: '3',
      email: 'hamshira@najotclinic.uz',
      full_name: 'Gulnora Abdullayeva',
      role: 'hamshira' as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  'duxtir@najotclinic.uz': {
    password: 'duxtir123',
    user: {
      id: '4',
      email: 'duxtir@najotclinic.uz',
      full_name: 'Malika Toshmatova',
      role: 'duxtir' as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check user credentials
    const credentials = USER_CREDENTIALS[email as keyof typeof USER_CREDENTIALS];
    if (credentials && credentials.password === password) {
      setUser(credentials.user);
      localStorage.setItem('user', JSON.stringify(credentials.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create new user and auto-login
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.fullName,
      role: 'user'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
