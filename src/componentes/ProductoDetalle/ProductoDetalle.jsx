import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import { useCart } from "../../context/useCart";
import { db } from "../../firebase/config";
import { BotonAccion } from "../BotonAccion/BotonAccion";
import Seo from "../Seo/Seo";
import Cargando from "../Cargando/Cargando";

function ProductoDetalle() {
    const { id } = useParams();
    const { carrito, addToCart } = useCart();
    const [producto, setProducto] = useState();
    const [error, setError] = useState(null);
    const [mensajeCarrito, setMensajeCarrito] = useState("");

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const productoRef = doc(db, "productos", id);
                const productoSnapshot = await getDoc(productoRef);

                if (productoSnapshot.exists()) {
                    setProducto({
                        id: productoSnapshot.id,
                        ...productoSnapshot.data()
                    });
                } else {
                    setProducto(null);
                }
            } catch (error) {
                setError("Error al cargar el producto");
                console.error(error);
            }
        };

        obtenerProducto();
    }, [id]);

    if (error) return <h2>{error}</h2>;
    if (producto === undefined) return <Cargando mensaje="Cargando detalle del producto..." />;
    if (!producto) return <h2>Producto no encontrado.</h2>;

    const manejarAgregarAlCarrito = () => {
        const productoEnCarrito = carrito.find((item) => item.id === producto.id);
        const cantidadEnCarrito = productoEnCarrito?.cantidad || 0;

        if (cantidadEnCarrito >= producto.stock) {
            setMensajeCarrito("No hay más unidades disponibles");
            return;
        }

        addToCart(producto);
        setMensajeCarrito("Producto agregado al carrito");
    };

    return (
        <div>
            <Seo
                titulo={producto.nombre}
                descripcion={`Conocé el Funko ${producto.nombre}, su precio y stock disponible.`}
            />
            <Link className="boton-volver" to="/productos">
                <FaArrowLeft aria-hidden="true" /> Volver a productos
            </Link>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: "300px", width: "100%" }} />
            <h3>${producto.precio}</h3>
            <p>Stock disponible: {producto.stock}</p>
            <BotonAccion type="button" onClick={manejarAgregarAlCarrito}>
                <FaCartPlus aria-hidden="true" /> Agregar al carrito
            </BotonAccion>
            {mensajeCarrito && (
                <p className="mensaje-carrito" role="status">{mensajeCarrito}</p>
            )}
        </div>
    );
}

export default ProductoDetalle;
