import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargandoAuth, setCargandoAuth] = useState(true);

    useEffect(() => {
        const cancelarObservador = onAuthStateChanged(auth, (usuarioFirebase) => {
            setUsuario(usuarioFirebase);
            setCargandoAuth(false);
        });

        return cancelarObservador;
    }, []);

    const registrar = (email, password) => (
        createUserWithEmailAndPassword(auth, email, password)
    );

    const iniciarSesion = (email, password) => (
        signInWithEmailAndPassword(auth, email, password)
    );

    const cerrarSesion = () => signOut(auth);

    return (
        <AuthContext.Provider value={{
            usuario,
            cargandoAuth,
            registrar,
            iniciarSesion,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    );
}
