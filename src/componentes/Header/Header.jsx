import './Header.module.css';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

function Header () {
    return (
        <>
        <header style={{ backgroundColor: "#8DE2D6", padding: "10px", textAlign: "center", color: "white" }}>
            <h1>Mi app React</h1>
            <nav style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                <Link style={{ color: "white" }} to="/">Inicio</Link>
                <Link style={{ color: "white" }} to="/productos">Productos</Link>
                <Link style={{ color: "white" }} to="/agregar-producto">Agregar producto</Link>
                <Link style={{ color: "white" }} to="/carrito"><CartWidget /></Link>
            </nav>
        </header>
        </>
    )
}

export default Header;
