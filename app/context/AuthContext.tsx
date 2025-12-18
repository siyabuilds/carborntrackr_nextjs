"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (fullName: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "carbontrackr-token";
const USER_KEY = "carbontrackr-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Validate token with backend on mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!token || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        await api.validateToken();
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = useCallback(async (usernameOrEmail: string, password: string) => {
    const credentials = usernameOrEmail.includes("@")
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    const data = await api.login(credentials);

    if (!data || typeof data.token !== "string" || data.token.trim() === "") {
      console.error("Invalid token received from login response:", data);
      throw new Error("Invalid authentication token received from server");
    }
    localStorage.setItem(TOKEN_KEY, data.token);
    
    const userData: User = {
      _id: "",
      fullName: usernameOrEmail,
      username: usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail,
      email: usernameOrEmail.includes("@") ? usernameOrEmail : "",
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard");
  }, [router]);

  const register = useCallback(async (fullName: string, username: string, email: string, password: string) => {
    await api.register({ fullName, username, email, password });
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
