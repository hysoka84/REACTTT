import { useState } from "react";
import { CartContext } from "./CarritoContext";

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const addToCart = (producto) => {
        setCarrito((carritoActual) => {
            const productoEnCarrito = carritoActual.find((item) => item.id === producto.id);

            if (productoEnCarrito) {
                if (productoEnCarrito.cantidad >= productoEnCarrito.stock) {
                    return carritoActual;
                }

                return carritoActual.map((item) => (
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                ));
            }

            return [...carritoActual, { ...producto, cantidad: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCarrito((carritoActual) => (
            carritoActual.filter((producto) => producto.id !== id)
        ));
    };

    const increaseQuantity = (id) => {
        setCarrito((carritoActual) => (
            carritoActual.map((producto) => (
                producto.id === id && producto.cantidad < producto.stock
                    ? { ...producto, cantidad: producto.cantidad + 1 }
                    : producto
            ))
        ));
    };

    const decreaseQuantity = (id) => {
        setCarrito((carritoActual) => (
            carritoActual
                .map((producto) => (
                    producto.id === id
                        ? { ...producto, cantidad: producto.cantidad - 1 }
                        : producto
                ))
                .filter((producto) => producto.cantidad > 0)
        ));
    };

    const clearCart = () => {
        setCarrito([]);
    };

    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const precioTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            cantidadTotal,
            precioTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}
