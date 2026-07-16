import Spinner from "react-bootstrap/Spinner";

function Cargando({ mensaje = "Cargando..." }) {
    return (
        <div className="cargando" role="status" aria-live="polite">
            <Spinner animation="border" variant="primary" aria-hidden="true" />
            <span>{mensaje}</span>
        </div>
    );
}

export default Cargando;
