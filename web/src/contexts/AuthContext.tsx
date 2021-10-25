import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthProviderData = {
  children: ReactNode;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderData) {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=adafded4beb718365850`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/sessions', {
      code: githubCode,
    });

    const { token, user } = response.data;

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    localStorage.setItem('@doWhile:token', token);

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@doWhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>('/users/profile').then((res) => setUser(res.data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut, signInUrl }}>
      {children}
    </AuthContext.Provider>
  );
}
