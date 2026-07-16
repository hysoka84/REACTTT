import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Cargando from "../Cargando/Cargando";

function ProtectedRoute() {
    const { usuario, cargandoAuth } = useAuth();
    const location = useLocation();

    if (cargandoAuth) {
        return <Cargando mensaje="Comprobando sesión..." />;
    }

    if (!usuario) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
