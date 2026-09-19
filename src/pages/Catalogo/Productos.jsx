import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import CharacterCard from "../../components/Catalogo/CharacterCard";
import { useCart } from "../../context/CartContext";
import { ChevronLeft, ChevronRight, X, Rocket, Info, DollarSign, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";

export default function Productos() {
  const [pagina, setPagina] = useState(1);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const { personajes, cargando, error } = useCharacters(pagina);
  const { agregarAlCarrito } = useCart();

  const handleAgregarDesdeModal = (item) => {
    if (agregarAlCarrito) {
      agregarAlCarrito(item);
    }
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: `🚀 ${item.nombre || item.name}`,
      text: "¡Añadido al carrito con éxito!",
      showConfirmButton: false,
      timer: 2000,
      background: "#0f172a",
      color: "#f8fafc",
      iconColor: "#38bdf8",
    });
    setPersonajeSeleccionado(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Rocket className="text-cyan-600 dark:text-cyan-400" /> Catálogo Espacial
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Explora los componentes, misiones y hallazgos astronómicos</p>
      </div>

      {cargando ? (
        <div className="text-center py-20 text-cyan-600 dark:text-cyan-400 animate-pulse font-semibold">
          🚀 Cargando transmisiones espaciales...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-rose-500 dark:text-rose-400">❌ Error: {error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {personajes.map((item) => (
              <CharacterCard
                key={item.id}
                personaje={item}
                alSeleccionar={(elem) => setPersonajeSeleccionado(elem)}
              />
            ))}
          </div>

          {/* Paginador */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
              disabled={pagina === 1}
              className="flex items-center gap-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl disabled:opacity-40 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer border border-slate-300 dark:border-slate-700"
            >
              <ChevronLeft size={18} /> Anterior
            </button>
            <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400 bg-slate-200/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl ring-1 ring-slate-300 dark:ring-slate-700">
              Página {pagina}
            </span>
            <button
              onClick={() => setPagina((prev) => prev + 1)}
              className="flex items-center gap-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer border border-slate-300 dark:border-slate-700"
            >
              Siguiente <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}

      {/* Modal de Información de Detalle con Botón de Carrito */}
      {personajeSeleccionado && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPersonajeSeleccionado(null)}
              className="absolute top-3 right-3 p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-slate-800/80 rounded-full transition-all cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="relative h-60">
              <img
                src={personajeSeleccionado.imagen || personajeSeleccionado.image}
                alt={personajeSeleccionado.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
            </div>

            <div className="p-6 -mt-6 relative">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500/40">
                {personajeSeleccionado.rangoEspacial || "Detalle de Misión"}
              </span>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4">
                {personajeSeleccionado.nombre || personajeSeleccionado.name}
              </h3>

              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 mb-6">
                <p className="flex items-center gap-2">
                  <Info size={16} className="text-cyan-600 dark:text-cyan-400" />
                  <strong className="text-slate-600 dark:text-slate-400">Origen/Misión:</strong>{" "}
                  {personajeSeleccionado.episodio || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Rocket size={16} className="text-cyan-600 dark:text-cyan-400" />
                  <strong className="text-slate-600 dark:text-slate-400">Centro NASA:</strong>{" "}
                  {personajeSeleccionado.status || "Activo"}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={16} className="text-cyan-600 dark:text-cyan-400" />
                  <strong className="text-slate-600 dark:text-slate-400">Valor Estimado:</strong>{" "}
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                    ${(personajeSeleccionado.precioUnitario || personajeSeleccionado.precio || 0).toLocaleString("es-CO")} COP
                  </span>
                </p>
              </div>

              {/* Botones de acción organizados */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAgregarDesdeModal(personajeSeleccionado)}
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Agregar al Carrito
                </button>
                <button
                  onClick={() => setPersonajeSeleccionado(null)}
                  className="px-5 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold rounded-xl transition-all cursor-pointer border border-slate-300 dark:border-slate-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}