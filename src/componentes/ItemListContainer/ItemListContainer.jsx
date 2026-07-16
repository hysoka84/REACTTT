import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import ItemList from "../ItemList/ItemList";
import Cargando from "../Cargando/Cargando";
import Paginador from "../Paginador/Paginador";
import Seo from "../Seo/Seo";
import { db } from "../../firebase/config";

const PRODUCTOS_POR_PAGINA = 8;

function ItemListContainer({ mensaje, administrar = false }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosCollection = collection(db, "productos");
                const consulta = await getDocs(productosCollection);
                const productosFirestore = consulta.docs.map((documento) => ({
                    id: documento.id,
                    ...documento.data()
                }));

                setProductos(productosFirestore);
            } catch (error) {
                setError("No se pudieron cargar los productos desde Firebase");
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
    const indiceInicial = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosVisibles = productosFiltrados.slice(
        indiceInicial,
        indiceInicial + PRODUCTOS_POR_PAGINA
    );

    const manejarBusqueda = (evento) => {
        setBusqueda(evento.target.value);
        setPaginaActual(1);
    };

    const eliminarProducto = async (id, nombre) => {
        const confirmar = window.confirm(`¿Eliminar ${nombre}?`);

        if (!confirmar) return;

        try {
            await deleteDoc(doc(db, "productos", id));
            setProductos((productosActuales) =>
                productosActuales.filter((producto) => producto.id !== id)
            );
        } catch (error) {
            setError("No se pudo eliminar el producto");
            console.error(error);
        }
    };

    if (cargando) return <Cargando mensaje="Cargando productos..." />;
    if (error) return <p className="mensaje-error">Error: {error}</p>;

    return (
        <div>
            <Seo
                titulo={administrar ? "Gestión de productos" : mensaje === "Funkos destacados" ? "Inicio" : "Productos"}
                descripcion="Explorá el catálogo de Funkos disponibles en FunkoManía."
            />
            <h2>{mensaje}</h2>

            {!administrar && (
                <div className="buscador-productos">
                    <label htmlFor="busqueda">Buscar un Funko</label>
                    <input
                        id="busqueda"
                        type="search"
                        placeholder="Ejemplo: Spider-Man"
                        value={busqueda}
                        onChange={manejarBusqueda}
                    />
                </div>
            )}

            {productosFiltrados.length > 0 ? (
                <>
                    <ItemList
                        productos={productosVisibles}
                        onDelete={administrar ? eliminarProducto : null}
                    />
                    <Paginador
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        cambiarPagina={setPaginaActual}
                    />
                </>
            ) : (
                <p>No encontramos productos con ese nombre.</p>
            )}
        </div>
    );
}

export default ItemListContainer;
