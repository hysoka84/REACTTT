import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { useAuth } from '../../context/useAuth';

function Header () {
    const { usuario, cerrarSesion } = useAuth();

    return (
        <header className={styles.header}>
            <Link className={styles.marca} to="/">FunkoManía</Link>
            <nav className={styles.nav} aria-label="Navegación principal">
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/productos">Productos</NavLink>
                <Link to="/carrito"><CartWidget /></Link>
                {usuario ? (
                    <>
                        <NavLink to="/agregar-producto">Agregar producto</NavLink>
                        <NavLink to="/gestion">Gestionar</NavLink>
                        <span className={styles.usuario}>{usuario.email}</span>
                        <button className={styles.logout} type="button" onClick={cerrarSesion}>
                            Salir
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Ingresar</NavLink>
                        <NavLink to="/registro">Registrarse</NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;
