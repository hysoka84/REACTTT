import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [rol, setRol] = useState(null);
    const [cargandoAuth, setCargandoAuth] = useState(true);

    useEffect(() => {
        const cancelarObservador = onAuthStateChanged(auth, async (usuarioFirebase) => {
            setCargandoAuth(true);
            setUsuario(usuarioFirebase);
            setRol(null);

            if (usuarioFirebase) {
                try {
                    const usuarioRef = doc(db, "usuarios", usuarioFirebase.uid);
                    const usuarioSnapshot = await getDoc(usuarioRef);

                    if (usuarioSnapshot.exists()) {
                        setRol(usuarioSnapshot.data().rol);
                    }
                } catch (error) {
                    console.error("No se pudo obtener el rol del usuario", error);
                }
            }

            setCargandoAuth(false);
        });

        return cancelarObservador;
    }, []);

    const registrar = async (email, password) => {
        setCargandoAuth(true);

        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setCargandoAuth(false);
            throw error;
        }
    };

    const iniciarSesion = async (email, password) => {
        setCargandoAuth(true);

        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setCargandoAuth(false);
            throw error;
        }
    };

    const cerrarSesion = () => signOut(auth);
    const esAdmin = rol === "admin";

    return (
        <AuthContext.Provider value={{
            usuario,
            rol,
            esAdmin,
            cargandoAuth,
            registrar,
            iniciarSesion,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    );
}
