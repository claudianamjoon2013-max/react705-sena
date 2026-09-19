import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito_sena");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito_sena", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar un producto específico del carrito (¡Requerido por la guía!)
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Vaciar todo el carrito y limpiar localStorage (Punto 5.g)
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito_sena");
  };

  // Cálculos de Totales, IVA (19%) y Subtotales (Punto 5.c)
  const subtotalGeneral = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const iva = subtotalGeneral * 0.19;
  const totalAPagar = subtotalGeneral + iva;
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        subtotalGeneral,
        iva,
        totalAPagar,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}