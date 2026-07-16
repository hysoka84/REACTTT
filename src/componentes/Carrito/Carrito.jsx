import { Link } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../../context/useCart";
import { BotonAccion } from "../BotonAccion/BotonAccion";
import Seo from "../Seo/Seo";

function Carrito() {
    const {
        carrito,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        precioTotal
    } = useCart();

    if (carrito.length === 0) {
        return (
            <div>
                <Seo titulo="Carrito" descripcion="Revisá los productos de tu carrito de compras." />
                <Link className="boton-volver" to="/productos">
                    <FaArrowLeft aria-hidden="true" /> Seguir comprando
                </Link>
                <h2>Carrito de compras</h2>
                <p>No hay productos agregados al carrito.</p>
            </div>
        );
    }

    return (
        <div>
            <Seo titulo="Carrito" descripcion="Revisá los productos de tu carrito de compras." />
            <Link className="boton-volver" to="/productos">
                <FaArrowLeft aria-hidden="true" /> Seguir comprando
            </Link>
            <h2>Carrito de compras</h2>
            <div className="carrito-lista">
                {carrito.map((producto) => (
                    <article key={producto.id} className="carrito-producto">
                        <img
                            className="carrito-producto__imagen"
                            src={producto.imagen}
                            alt={producto.nombre}
                        />
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock disponible: {producto.stock}</p>
                        <div className="carrito-cantidad">
                            <button
                                type="button"
                                onClick={() => decreaseQuantity(producto.id)}
                                aria-label={`Quitar una unidad de ${producto.nombre}`}
                            >
                                <FaMinus aria-hidden="true" />
                            </button>
                            <span>Cantidad: {producto.cantidad}</span>
                            <button
                                type="button"
                                onClick={() => increaseQuantity(producto.id)}
                                disabled={producto.cantidad >= producto.stock}
                                aria-label={`Agregar una unidad de ${producto.nombre}`}
                            >
                                <FaPlus aria-hidden="true" />
                            </button>
                        </div>
                        <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                        <BotonAccion
                            $peligro
                            type="button"
                            onClick={() => removeFromCart(producto.id)}
                        >
                            <FaTrash aria-hidden="true" /> Eliminar del carrito
                        </BotonAccion>
                    </article>
                ))}
            </div>
            <h3>Total: ${precioTotal}</h3>
            <BotonAccion $peligro type="button" onClick={clearCart}>
                <FaTrash aria-hidden="true" /> Vaciar carrito
            </BotonAccion>
        </div>
    );
}

export default Carrito;
