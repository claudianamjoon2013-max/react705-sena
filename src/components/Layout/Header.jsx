import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Trash2, Rocket, User, LogOut, Send, CheckCircle, Mail, Shield, Award, X } from "lucide-react";
import Swal from "sweetalert2";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; 
import Navbar from "./Navbar";
import "./Header.css";

function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarPerfilAmpliado, setMostrarPerfilAmpliado] = useState(false); 
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mensajeEnvio, setMensajeEnvio] = useState(null);

  const [usuarioInput, setUsuarioInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const { tema, cambiarTema } = useTheme();
  
  const { 
    carrito, 
    totalItems, 
    vaciarCarrito, 
    eliminarDelCarrito, 
    subtotalGeneral, 
    iva, 
    totalAPagar 
  } = useCart();
  
  const { user, login, logout } = useAuth();

  const dropdownCarritoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownCarritoRef.current && !dropdownCarritoRef.current.contains(event.target)) {
        setMostrarCarrito(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const obtenerIniciales = (nombreCompleto) => {
    if (!nombreCompleto) return "U";
    const palabras = nombreCompleto.trim().split(" ");
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return palabras[0][0].toUpperCase();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!usuarioInput.trim() || !passwordInput.trim()) {
      setErrorLogin("Por favor completa todos los campos.");
      return;
    }
    
    login({ 
      name: usuarioInput, 
      email: `${usuarioInput.toLowerCase()}@sena.edu.co`,
      rol: "Tripulante / Aprendiz ADSO" 
    }); 
    
    setMostrarLogin(false);
    setUsuarioInput("");
    setPasswordInput("");
    setErrorLogin("");

    Swal.fire({
      icon: 'success',
      title: '¡Bienvenida a bordo!',
      text: `Sesión iniciada correctamente, ${usuarioInput}.`,
      background: '#0f172a',
      color: '#f8fafc',
      confirmButtonColor: '#06b6d4'
    });
  };

  const handleCerrarSesion = () => {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: "Tendrás que ingresar nuevamente con tus credenciales de tripulante.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06b6d4',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#0f172a',
      color: '#f8fafc'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        setMostrarPerfilAmpliado(false);
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has salido del sistema con éxito.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#0f172a',
          color: '#f8fafc'
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  const handleEnviarPedido = () => {
    if (carrito.length === 0) return;

    Swal.fire({
      title: '¿Enviar pedido intergaláctico?',
      text: "Tus productos serán despachados a la base espacial.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#06b6d4',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Sí, enviar pedido',
      cancelButtonText: 'Revisar',
      background: '#0f172a',
      color: '#f8fafc'
    }).then((result) => {
      if (result.isConfirmed) {
        setMensajeEnvio({ tipo: "exito", texto: "¡Pedido enviado con éxito a la base espacial! 🚀" });
        
        Swal.fire({
          title: '¡Enviado con éxito!',
          text: 'Tu pedido espacial ha sido registrado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#0f172a',
          color: '#f8fafc'
        });

        setTimeout(() => {
          vaciarCarrito();
          localStorage.removeItem("carrito_sena"); 
          setMensajeEnvio(null);
          setMostrarCarrito(false);
        }, 2000);
      }
    });
  };

  const subtotalCalculado = subtotalGeneral || carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const ivaCalculado = iva || subtotalCalculado * 0.19;
  const totalCalculado = totalAPagar || subtotalCalculado + ivaCalculado;

  return (
    <>
      <header className="header">
        <Link to="/" className="header-left">
          <img src="/logo.jfif" alt="Logo" className="header-logo" />
          <h1 className="header-title">¡Hostias, Tía! Me Van A Coger</h1>
        </Link>

        <Navbar />

        <div className="flex items-center gap-3 relative">
          {/* Botón Carrito */}
          <div className="relative" ref={dropdownCarritoRef}>
            <button
              type="button"
              onClick={() => setMostrarCarrito(!mostrarCarrito)}
              className="relative p-2 rounded-full hover:bg-slate-700/20 text-sky-400 transition-colors cursor-pointer"
              title="Ver menú del carrito"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900 shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Menú Desplegable Carrito */}
            {mostrarCarrito && (
              <div className="absolute right-0 mt-2 w-88 bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl p-4 z-50 text-slate-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <h3 className="font-bold text-sm text-cyan-400 flex items-center gap-2">
                    <Rocket size={16} /> Carrito Intergaláctico
                  </h3>
                  <span className="text-xs text-slate-400">{totalItems} ítems</span>
                </div>

                {mensajeEnvio && (
                  <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle size={16} /> {mensajeEnvio.texto}
                  </div>
                )}

                {carrito.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-sm">
                    <p className="text-2xl mb-2">🪐</p>
                    <p>Tu bodega de carga está vacía.</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto my-3 space-y-3 pr-1">
                      {carrito.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800/80 pb-2">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-cyan-500/20" />
                          
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate text-slate-200">{item.name}</p>
                            <p className="text-slate-400">Cant: {item.cantidad} x ${item.precio.toLocaleString("es-CO")}</p>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-cyan-400 block">
                              ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer ml-1"
                            title="Eliminar este ítem"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal:</span>
                        <span>${subtotalCalculado.toLocaleString("es-CO")}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>IVA (19%):</span>
                        <span>${ivaCalculado.toLocaleString("es-CO")}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-cyan-400 pt-1 border-t border-slate-800/50">
                        <span>Total a Pagar:</span>
                        <span>${totalCalculado.toLocaleString("es-CO")}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={vaciarCarrito}
                          className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                          title="Vaciar toda la bodega"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleEnviarPedido}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          <Send size={14} /> Enviar Pedido
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Botón Tema */}
          <button
            type="button"
            onClick={cambiarTema}
            title={tema === "claro" ? "Modo Oscuro" : "Modo Claro"}
            className="p-2 rounded-full hover:bg-slate-700/20 text-sky-400 transition-colors cursor-pointer"
          >
            {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Login / Perfil (Abre directamente el perfil ampliado grande) */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMostrarPerfilAmpliado(true)}
                className="flex items-center gap-2 p-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                title="Ver perfil completo de tripulante"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  {user.name ? obtenerIniciales(user.name) : <User size={16} />}
                </div>
              </button>
            </div>
          ) : (
            <button className="header-login" onClick={() => setMostrarLogin(true)}>
              Login
            </button>
          )}
        </div>
      </header>

      {/* Modal Login Completo */}
      {mostrarLogin && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-cyan-500/30 w-full max-w-md rounded-2xl shadow-2xl p-6 text-slate-100 relative">
            <button 
              onClick={() => setMostrarLogin(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              🚀 Acceso de Tripulante
            </h2>

            {errorLogin && (
              <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-semibold">
                {errorLogin}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de Usuario</label>
                <input 
                  type="text" 
                  placeholder="Ej. Claudia Patricia" 
                  value={usuarioInput}
                  onChange={(e) => setUsuarioInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Perfil Ampliado (Grande y profesional) */}
      {mostrarPerfilAmpliado && user && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-cyan-500/40 w-full max-w-md rounded-3xl shadow-2xl p-6 text-slate-100 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>

            <button 
              onClick={() => setMostrarPerfilAmpliado(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3 border-2 border-slate-900">
                {user.name ? obtenerIniciales(user.name) : <User size={32} />}
              </div>
              <h2 className="text-xl font-bold text-cyan-400">{user.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Shield size={14} className="text-cyan-400" /> {user.rol || "Tripulante / Aprendiz ADSO"}
              </p>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Mail size={18} className="text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Correo institucional</p>
                  <p className="font-medium text-slate-200">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Award size={18} className="text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Estado del Tripulante</p>
                  <p className="font-medium text-emerald-400">● Activo en Misión SENA</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCerrarSesion}
                className="w-full flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer border border-rose-500/30 shadow-md"
              >
                <LogOut size={16} /> Cerrar Sesión de la Base
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Header;