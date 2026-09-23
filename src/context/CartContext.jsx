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

  // Eliminar un producto específico del carrito 
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Vaciar todo el carrito y limpiar localStorage (Punto 5.g)
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito_sena");
  };

  // Cálculos cuando el precio del producto YA TRAE EL IVA INCLUIDO
  const totalAPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  
  // El subtotal real se obtiene dividiendo el total entre 1.19
  const subtotalGeneral = totalAPagar / 1.19;
  
  // El IVA es la diferencia entre lo que paga el cliente y el subtotal sin IVA
  const iva = totalAPagar - subtotalGeneral;
  
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