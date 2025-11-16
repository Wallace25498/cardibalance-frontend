//Authcontext para confirmação se usuario está logado no sistema
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  logged: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState(false);

  function login() {
    setLogged(true);
  }

  function logout() {
    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}