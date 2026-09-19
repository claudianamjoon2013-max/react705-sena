import { useState, useEffect } from "react";

export function useCharacters(pagina = 1) {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarCuerposEspaciales() {
      try {
        setCargando(true);

        const res = await fetch(
          "https://images-api.nasa.gov/search?q=nebula&media_type=image"
        );
        if (!res.ok) throw new Error("Error al consultar las imágenes de la NASA");

        const data = await res.json();
        const items = data.collection.items.slice((pagina - 1) * 8, pagina * 8);

        const listaFormateada = items.map((item, index) => {
          const info = item.data[0] || {};
          const imagenUrl = item.links ? item.links[0].href : "";

          return {
            id: info.nasa_id || `nasa-space-${index}`,
            name: info.title || "Nebulosa Espacial",
            nombre: info.title || "Nebulosa Espacial",
            image: imagenUrl,
            imagen: imagenUrl,
            precio: 35000 + (index + 1) * 4500,
            precioUnitario: 35000 + (index + 1) * 4500,
            episodio: `Misión ${info.center || "Hubble/Webb"}`,
            status: info.center || "NASA Central",
            ubicacionActual: "Deep Space",
            rangoEspacial: "Cuerpo Celeste",
          };
        });

        if (activo) setPersonajes(listaFormateada);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarCuerposEspaciales();

    return () => {
      activo = false;
    };
  }, [pagina]);

  return { personajes, cargando, error };
}
