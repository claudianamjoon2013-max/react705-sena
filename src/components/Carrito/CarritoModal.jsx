import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Trash2, ShoppingBag, Send, CheckCircle, AlertTriangle } from "lucide-react";

export default function CarritoModal({ onClose }) {
  const { carrito, eliminarDelCarrito, vaciarCarrito, subtotalGeneral, iva, totalAPagar, totalItems } = useCart();
  const [mensajeEnvio, setMensajeEnvio] = useState(null); // Punto 5.f

  // Manejador del botón "Enviar Pedido" con confirmación (Punto 5.e y 5.f)
  const handleEnviarPedido = () => {
    if (carrito.length === 0) {
      setMensajeEnvio({ tipo: "error", texto: "¡Error! El carrito está vacío, no se puede enviar el pedido." });
      return;
    }

    const confirmar = window.confirm("¿Estás seguro de que deseas enviar este pedido intergaláctico?");
    
    if (confirmar) {
      // Simulamos éxito en el envío del pedido
      setMensajeEnvio({ tipo: "exito", texto: "¡Pedido enviado con éxito a la base espacial! 🚀" });
      
      // Vaciamos el carrito y el localStorage tal como pide el punto 5.g
      setTimeout(() => {
        vaciarCarrito();
        setMensajeEnvio(null);
        if (onClose) onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border border-cyan-500/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <ShoppingBag size={20} /> Carrito de Productos ({totalItems})
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold px-2 py-1 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Mensaje de éxito o error (Punto 5.f) */}
        {mensajeEnvio && (
          <div className={`p-3 m-4 rounded-xl flex items-center gap-2 text-sm font-semibold ${
            mensajeEnvio.tipo === "exito" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          }`}>
            {mensajeEnvio.tipo === "exito" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            {mensajeEnvio.texto}
          </div>
        )}

        {/* Lista de Productos (Punto 5.a y 5.b) */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {carrito.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-2">🪐</p>
              <p>No hay productos agregados en el carrito.</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-cyan-500/30" />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-cyan-300 truncate">{item.name}</h4>
                  <p className="text-xs text-slate-400">Episodio: {item.episode || "N/A"}</p>
                  <p className="text-xs text-slate-300">Cant: {item.cantidad} x ${item.precio?.toLocaleString("es-CO")}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Subtotal</p>
                  <p className="font-bold text-sm text-cyan-400">
                    ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                  </p>
                </div>

                {/* Botón de eliminar por ítem */}
                <button
                  type="button"
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar producto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Totales, IVA y Botón Enviar Pedido (Punto 5.c y 5.d) */}
        {carrito.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Subtotal:</span>
              <span>${subtotalGeneral.toLocaleString("es-CO")}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>IVA (19%):</span>
              <span>${iva.toLocaleString("es-CO")}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-cyan-400 pt-1 border-t border-slate-800">
              <span>Total a Pagar:</span>
              <span>${totalAPagar.toLocaleString("es-CO")}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Vaciar Carrito
              </button>
              <button
                type="button"
                onClick={handleEnviarPedido}
                className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Send size={16} /> Enviar Pedido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}