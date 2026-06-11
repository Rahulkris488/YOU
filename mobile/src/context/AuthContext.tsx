import React, { createContext, useEffect, useMemo, useState } from 'react';
import { clearSessionStorage, loadSession, saveSession } from '@/services/sessionStorage';
import type { User } from '../types/user';

type AuthContextValue = {
  isHydrated: boolean;
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  clearSession: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isHydrated: false,
  token: null,
  user: null,
  setSession: () => undefined,
  updateUser: () => undefined,
  clearSession: () => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [isHydrated, setIsHydrated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    loadSession().then(session => {
      if (!mounted) {
        return;
      }

      if (session) {
        setToken(session.token);
        setUser(session.user);
      }

      setIsHydrated(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      isHydrated,
      token,
      user,
      setSession: (nextToken: string, nextUser: User) => {
        setToken(nextToken);
        setUser(nextUser);
        saveSession(nextToken, nextUser).catch(() => {});
      },
      updateUser: (nextUser: User) => {
        setUser(nextUser);

        if (token) {
          saveSession(token, nextUser).catch(() => {});
        }
      },
      clearSession: () => {
        setToken(null);
        setUser(null);
        clearSessionStorage().catch(() => {});
      },
    }),
    [isHydrated, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
