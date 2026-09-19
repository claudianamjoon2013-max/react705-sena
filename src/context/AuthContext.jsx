import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user_sena");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user_sena", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user_sena");
    }
  }, [user]);

  // Función de login (Punto 5.h y 5.i)
  const login = (userData) => {
    setUser(userData);
  };

  // Función de cerrar sesión (Punto 5.k)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user_sena");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}



