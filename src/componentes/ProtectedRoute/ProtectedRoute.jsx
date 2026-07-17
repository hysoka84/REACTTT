import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Cargando from "../Cargando/Cargando";

function ProtectedRoute({ soloAdmin = false }) {
    const { usuario, esAdmin, cargandoAuth } = useAuth();
    const location = useLocation();

    if (cargandoAuth) {
        return <Cargando mensaje="Comprobando sesión..." />;
    }

    if (!usuario) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (soloAdmin && !esAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
