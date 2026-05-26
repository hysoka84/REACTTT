import { useState } from "react";
import { CartContext } from "./CarritoContext";

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const addToCart = (producto) => {
        const productoEnCarrito = carrito.find((item) => item.id === producto.id);

        if (productoEnCarrito) {
            setCarrito(carrito.map((item) => (
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const precioTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    return (
        <CartContext.Provider value={{ carrito, addToCart, cantidadTotal, precioTotal }}>
            {children}
        </CartContext.Provider>
    );
}
