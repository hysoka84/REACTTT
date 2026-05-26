import { Link } from "react-router-dom";

export function Item({ id, nombre, precio, stock, imagen }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px", width: "180px" }}>
            <img src={imagen} alt={nombre} width="150" style={{ height: "120px", objectFit: "cover" }} />
            <h3>{nombre}</h3>
            <p>Valor: ${precio}</p>
            <p>stock disponible: {stock}</p>
            <Link to={`/producto/${id}`}>Ver detalle</Link>
        </div>
    );
}

export default Item;
