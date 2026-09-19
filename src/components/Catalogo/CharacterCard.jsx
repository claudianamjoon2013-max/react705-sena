import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

function formatearPrecio(valor) {
  const num = typeof valor === "number" && !isNaN(valor) ? valor : 0;
  return num.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CharacterCard({ personaje = {}, alSeleccionar }) {
  const { agregarAlCarrito } = useCart();

  const precio = personaje?.precioUnitario ?? personaje?.precio ?? 0;
  const nombre = personaje?.nombre ?? personaje?.name ?? "Elemento NASA";
  const imagen = personaje?.imagen ?? personaje?.image ?? "";

  const handleAgregar = (e) => {
    e.stopPropagation();
    if (agregarAlCarrito) {
      agregarAlCarrito(personaje);
    }

    // Notificación flotante de éxito
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: `🚀 ${nombre}`,
      text: "¡Añadido al carrito con éxito!",
      showConfirmButton: false,
      timer: 2000,
      background: "#0f172a",
      color: "#f8fafc",
      iconColor: "#38bdf8",
    });
  };

  return (
    <article
      onClick={() => alSeleccionar && alSeleccionar(personaje)}
      className="group bg-slate-800 rounded-2xl ring-1 ring-slate-700/60 overflow-hidden hover:ring-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="relative overflow-hidden group">
          <img
                    src={imagen}
            alt={nombre}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/90 text-slate-950 rounded-full text-xs font-bold shadow-lg">
              <Eye size={14} /> Ver detalles
            </span>
          </div>
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-cyan-300 backdrop-blur-md ring-1 ring-slate-700">
            {personaje?.rangoEspacial || "Misión NASA"}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 mb-2" title={nombre}>
            {nombre}
          </h3>

          <ul className="space-y-1 text-xs text-slate-400">
            <li>
              <span className="text-slate-500 font-medium">Origen/Misión:</span>{" "}
              {personaje?.episodio || "Sector Alfa"}
            </li>
            <li>
              <span className="text-slate-500 font-medium">Estado:</span>{" "}
              <span className="text-cyan-400 font-medium">{personaje?.status || "Activo"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Precio</span>
            <span className="text-cyan-400 font-extrabold text-base">
              {formatearPrecio(precio)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAgregar}
            className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer font-semibold shadow-md shadow-cyan-500/20"
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}