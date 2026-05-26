import { useCart } from "../../context/useCart";

function Carrito() {
    const { carrito, precioTotal } = useCart();

    if (carrito.length === 0) {
        return (
            <div>
                <h2>Carrito de compras</h2>
                <p>No hay productos agregados al carrito.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Carrito de compras</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                {carrito.map((producto) => (
                    <div key={producto.id} style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px", width: "80%", maxWidth: "500px" }}>
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                    </div>
                ))}
            </div>
            <h3>Total: ${precioTotal}</h3>
        </div>
    );
}

export default Carrito;
