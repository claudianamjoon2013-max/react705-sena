import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto global de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa el estado del usuario leyendo directamente del localStorage para que no se pierda al recargar
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user_sena");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sincroniza automáticamente los cambios del usuario con el localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user_sena", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user_sena");
    }
  }, [user]);

  // Función de login (para iniciar sesión y actualizar el estado global)
  const login = (userData) => {
    setUser(userData);
  };

  // Función de cerrar sesión (limpia el estado y borra el localStorage)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user_sena");
  };

  return (
    // Proveedor que envuelve la app y comparte el usuario, el login y el logout
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto de autenticación de forma sencilla
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

