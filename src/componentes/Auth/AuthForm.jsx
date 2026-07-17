import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/useAuth";
import Seo from "../Seo/Seo";

function AuthForm({ modo }) {
    const esRegistro = modo === "registro";
    const navigate = useNavigate();
    const location = useLocation();
    const { registrar, iniciarSesion } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Completá el correo y la contraseña");
            return;
        }

        if (esRegistro && password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setEnviando(true);

        try {
            if (esRegistro) {
                await registrar(email, password);
            } else {
                await iniciarSesion(email, password);
            }

            const destino = location.state?.from?.pathname || "/gestion";
            navigate(destino, { replace: true });
        } catch (errorFirebase) {
            if (errorFirebase.code === "auth/email-already-in-use") {
                setError("El correo ya está registrado");
            } else if (errorFirebase.code === "auth/invalid-credential") {
                setError("Correo o contraseña incorrectos");
            } else {
                setError("No se pudo completar la autenticación");
            }
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={manejarEnvio} noValidate>
            <Seo
                titulo={esRegistro ? "Registro" : "Iniciar sesión"}
                descripcion={esRegistro ? "Creá una cuenta en FunkoManía." : "Ingresá a tu cuenta de FunkoManía."}
            />
            <h2>{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h2>

            <div>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Contraseña:</label>
                <div className="password-input">
                    <input
                        id="password"
                        type={mostrarPassword ? "text" : "password"}
                        value={password}
                        onChange={(evento) => setPassword(evento.target.value)}
                    />
                    <button
                        className="password-input__boton"
                        type="button"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                        aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={mostrarPassword}
                    >
                        {mostrarPassword
                            ? <FaEyeSlash aria-hidden="true" />
                            : <FaEye aria-hidden="true" />}
                    </button>
                </div>
            </div>

            <button type="submit" disabled={enviando}>
                {enviando
                    ? "Procesando..."
                    : esRegistro ? "Registrarme" : "Ingresar"}
            </button>

            {error && <p className="mensaje-error" role="alert">{error}</p>}

            <p>
                {esRegistro ? "¿Ya tenés cuenta? " : "¿No tenés cuenta? "}
                <Link to={esRegistro ? "/login" : "/registro"}>
                    {esRegistro ? "Iniciar sesión" : "Registrarme"}
                </Link>
            </p>
        </form>
    );
}

export default AuthForm;
