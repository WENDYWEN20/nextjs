"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface UserContextType {
  user: User;
  setUser: (user: User | null) => void;
  loading: boolean;
}
interface User {
  name: string;
}
const loginURL = "http://localhost:3000/api/auth/me";
const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(loginURL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((error) => console.log("userProvider error", error));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
//a custom hook useUser