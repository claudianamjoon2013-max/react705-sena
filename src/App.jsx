import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
import Layout from "./components/Layout/Layout";
import Inicio from "./pages/Inicio";
import Escenario from "./pages/Escenario/Escenario";
import Productos from "./pages/Catalogo/Productos";
import Contacto from "./pages/Contacto/Contacto";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider> {/* 2. Envolvemos la app con el AuthProvider */}
          <div className="fondo-espacial">
            {/* Estrellas pequeñas */}
            <div className="estrella-fondo" style={{ top: "8%", left: "3%" }}>✦</div>
            <div className="estrella-fondo" style={{ top: "18%", left: "94%" }}>✨</div>
            <div className="estrella-fondo" style={{ top: "35%", left: "2%" }}>✦</div>
            <div className="estrella-fondo" style={{ top: "50%", left: "96%" }}>✨</div>
            <div className="estrella-fondo" style={{ top: "72%", left: "4%" }}>✦</div>
            <div className="estrella-fondo" style={{ top: "88%", left: "93%" }}>✨</div>

            {/* Planetas empujados a las esquinas/bordes */}
            <div className="planeta-fondo" style={{ top: "10%", left: "2%" }}>🪐</div>
            <div className="planeta-fondo" style={{ top: "12%", left: "92%" }}>☄️</div>
            <div className="planeta-fondo" style={{ top: "45%", left: "1%" }}>🌍</div>
            <div className="planeta-fondo" style={{ top: "50%", left: "93%" }}>🌌</div>
            <div className="planeta-fondo" style={{ top: "82%", left: "2%" }}>🚀</div>
            <div className="planeta-fondo" style={{ top: "85%", left: "92%" }}>🌕</div>

            {/* Capa con z-index superior */}
            <div className="capa-contenido">
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/escenario" element={<Escenario />} />
                    <Route path="/catalogo" element={<Productos />} />
                    <Route path="/contacto" element={<Contacto />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </div>
          </div>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;