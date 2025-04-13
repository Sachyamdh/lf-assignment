"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      // Replace with actual auth check
      const token = localStorage.getItem("token");
      if (token) {
        //currently setting up the a dummmy user so that we can create teh features for now
        setUser({ id: "1", name: "John Doe", email: "john@example.com" });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname]);

  const signIn = async () => {
    setIsLoading(true);
    // Simulate sign in
    localStorage.setItem("token", "dummy-token");
    setUser({ id: "1", name: "John Doe", email: "john@example.com" });
    setIsLoading(false);
    router.push("/notes");
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
