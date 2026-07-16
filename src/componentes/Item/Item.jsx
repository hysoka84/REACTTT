import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BotonAccion } from "../BotonAccion/BotonAccion";

export function Item({ id, nombre, precio, stock, imagen, onDelete }) {
    return (
        <article className="producto-card">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p className="producto-card__precio">${precio}</p>
            <p>Stock disponible: {stock}</p>
            <Link to={`/producto/${id}`}>Ver detalle</Link>
            {onDelete && (
                <div className="producto-card__acciones">
                    <Link to={`/editar-producto/${id}`}>
                        <FaEdit aria-hidden="true" /> Editar
                    </Link>
                    <BotonAccion
                        $peligro
                        type="button"
                        onClick={() => onDelete(id, nombre)}
                    >
                        <FaTrash aria-hidden="true" /> Eliminar
                    </BotonAccion>
                </div>
            )}
        </article>
    );
}

export default Item;
