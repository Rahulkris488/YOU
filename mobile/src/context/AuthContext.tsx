import React, { createContext, useMemo, useState } from 'react';
import type { User } from '../types/user';

type AuthContextValue = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: null,
  setSession: () => undefined,
  clearSession: () => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      token,
      user,
      setSession: (nextToken: string, nextUser: User) => {
        setToken(nextToken);
        setUser(nextUser);
      },
      clearSession: () => {
        setToken(null);
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

