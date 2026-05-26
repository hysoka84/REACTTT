import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/useCart";

function ProductoDetalle() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [producto, setProducto] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                const productoEncontrado = datos.find((prod) => prod.id === parseInt(id));
                setProducto(productoEncontrado || null);
            })
            .catch(() => {
                setError("Error al cargar el producto");
            });
    }, [id]);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (producto === undefined) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto) {
        return <h2>Producto no encontrado.</h2>;
    }

    return (
        <div>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: "300px", width: "100%" }} />
            <h3>${producto.precio}</h3>
            <p>Stock disponible: {producto.stock}</p>
            <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
        </div>
    );
}

export default ProductoDetalle;
