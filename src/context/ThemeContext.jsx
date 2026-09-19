import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear la caja del contexto
const ThemeContext = createContext();

// 2. Componente Provider para envolver la app
export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  const cambiarTema = () => {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  };

  // Cada vez que "tema" cambia, agregamos o quitamos la clase "dark" en el <html>
  useEffect(() => {
    const root = document.documentElement;
    if (tema === "oscuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook para consumir el contexto fácilmente
export function useTheme() {
  return useContext(ThemeContext);
}