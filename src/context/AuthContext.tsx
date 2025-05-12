import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../domain/auth';
import { storage } from '../utils/storage';

type AuthContextData = {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    const token = await storage.getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    await storage.saveToken(response.id_token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await storage.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
