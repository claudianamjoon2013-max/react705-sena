import { User, Mail, Shield, Award, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function PerfilModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900 border border-cyan-500/40 w-full max-w-md rounded-3xl shadow-2xl p-6 text-slate-100 relative overflow-hidden">
        
        {/* Círculo decorativo de fondo espacial */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>

        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Cabecera del Perfil Ampliado */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3 border-2 border-slate-900">
            {user.name ? user.name.substring(0, 2).toUpperCase() : <User size={32} />}
          </div>
          <h2 className="text-xl font-bold text-cyan-400">{user.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <Shield size={14} className="text-cyan-400" /> {user.rol || "Tripulante / Aprendiz ADSO"}
          </p>
        </div>

        {/* Detalles de la cuenta */}
        <div className="py-4 space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Mail size={18} className="text-cyan-400" />
            <div>
              <p className="text-xs text-slate-400">Correo institucional / de acceso</p>
              <p className="font-medium text-slate-200">{user.email || `${user.name?.toLowerCase()}@sena.edu.co`}</p>
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

        {/* Botón de cierre de sesión dentro del perfil ampliado */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer border border-rose-500/30 shadow-md"
          >
            <LogOut size={16} /> Cerrar Sesión de la Base
          </button>
        </div>

      </div>
    </div>
  );
}

export default PerfilModal;