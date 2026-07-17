import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../../context/useCart";
import { db } from "../../firebase/config";
import { BotonAccion } from "../BotonAccion/BotonAccion";
import Seo from "../Seo/Seo";

function Carrito() {
    const [codigoCupon, setCodigoCupon] = useState("");
    const [cuponAplicado, setCuponAplicado] = useState(null);
    const [mensajeCupon, setMensajeCupon] = useState("");
    const [errorCupon, setErrorCupon] = useState("");
    const [aplicandoCupon, setAplicandoCupon] = useState(false);
    const {
        carrito,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        precioTotal
    } = useCart();

    const importeDescuento = cuponAplicado
        ? Math.round(precioTotal * cuponAplicado.descuento / 100)
        : 0;
    const totalFinal = precioTotal - importeDescuento;

    const aplicarCupon = async (evento) => {
        evento.preventDefault();

        const codigoNormalizado = codigoCupon.trim().toUpperCase();

        setMensajeCupon("");
        setErrorCupon("");

        if (!codigoNormalizado) {
            setCuponAplicado(null);
            setErrorCupon("Ingresá un código de descuento");
            return;
        }

        setAplicandoCupon(true);

        try {
            const consultaCupon = query(
                collection(db, "cupones"),
                where("codigo", "==", codigoNormalizado)
            );
            const respuesta = await getDocs(consultaCupon);

            if (respuesta.empty) {
                setCuponAplicado(null);
                setErrorCupon("El cupón ingresado no es válido");
                return;
            }

            const cupon = respuesta.docs[0].data();
            setCodigoCupon(codigoNormalizado);
            setCuponAplicado(cupon);
            setMensajeCupon(`Cupón aplicado: ${cupon.descuento}% de descuento`);
        } catch (error) {
            setCuponAplicado(null);
            setErrorCupon("No se pudo validar el cupón");
            console.error(error);
        } finally {
            setAplicandoCupon(false);
        }
    };

    const quitarCupon = () => {
        setCodigoCupon("");
        setCuponAplicado(null);
        setMensajeCupon("");
        setErrorCupon("");
    };

    const vaciarCarrito = () => {
        clearCart();
        quitarCupon();
    };

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
            <section className="carrito-resumen">
                <h3>Resumen de compra</h3>
                <p>Subtotal: ${precioTotal}</p>

                <form className="cupon-aplicar" onSubmit={aplicarCupon} noValidate>
                    <label htmlFor="codigo-cupon">Código de descuento:</label>
                    <div className="cupon-aplicar__controles">
                        <input
                            id="codigo-cupon"
                            type="text"
                            placeholder="Ejemplo: AMIGO2026"
                            value={codigoCupon}
                            onChange={(evento) => setCodigoCupon(evento.target.value)}
                            disabled={aplicandoCupon}
                        />
                        <button type="submit" disabled={aplicandoCupon}>
                            {aplicandoCupon ? "Aplicando..." : "Aplicar"}
                        </button>
                    </div>
                </form>

                {mensajeCupon && <p className="mensaje-exito" role="status">{mensajeCupon}</p>}
                {errorCupon && <p className="mensaje-error" role="alert">{errorCupon}</p>}

                {cuponAplicado && (
                    <>
                        <p>Descuento: -${importeDescuento}</p>
                        <button type="button" onClick={quitarCupon}>Quitar cupón</button>
                    </>
                )}

                <h3>Total: ${totalFinal}</h3>
            </section>

            <BotonAccion $peligro type="button" onClick={vaciarCarrito}>
                <FaTrash aria-hidden="true" /> Vaciar carrito
            </BotonAccion>
        </div>
    );
}

export default Carrito;
