import { tokenStorage } from "@/src/lib/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isLoggedIn: boolean | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Initial check when app opens
    tokenStorage.getToken().then((token) => setIsLoggedIn(!!token));
  }, []);

  const login = async (token: string) => {
    await tokenStorage.setToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await tokenStorage.clearToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
