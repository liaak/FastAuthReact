import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/api';
import type { LoginCredentials, RegisterCredentials, UserResponse, LoginResponse } from '../services/api';

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getCurrentUser(token)
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials: LoginCredentials) => {
    const response: LoginResponse = await apiLogin(credentials);
    setToken(response.access_token);
    localStorage.setItem('token', response.access_token);
    const userData = await getCurrentUser(response.access_token);
    setUser(userData);
  };

  const register = async (credentials: RegisterCredentials) => {
    await apiRegister(credentials);
    // Optionally auto-login after registration
    await login({ email: credentials.email, password: credentials.password });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
