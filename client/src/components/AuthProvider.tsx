import { useState, useEffect } from 'react';
import { AuthContext } from '../lib/auth/AuthContext';
import { User } from '@/types';
import {
  login as apiLogin,
  register as apiRegister,
} from '@/services/authService';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser(JSON.parse(localStorage.getItem('user') as string));
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const auth = await apiLogin(username, password);
      const { token, user } = auth;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setIsLoading(false);
      throw new Error('Wrong credentials');
    }

    setIsLoading(false);
  };

  const register = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const auth = await apiRegister(username, password);
      const { token, user } = auth;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setIsLoading(false);
      throw new Error('Registering failed');
    }

    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(undefined);
  };

  const authContextValue = {
    user,
    login,
    logout,
    register,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
