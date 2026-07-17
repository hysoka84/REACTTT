import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { db } from "../../firebase/config";
import Cargando from "../Cargando/Cargando";
import Seo from "../Seo/Seo";

const estadoInicial = {
    codigo: "",
    descuento: ""
};

function GestionCupones() {
    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);
    const [cuponAEliminar, setCuponAEliminar] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const obtenerCupones = async () => {
            try {
                const respuesta = await getDocs(collection(db, "cupones"));
                const lista = respuesta.docs.map((documento) => ({
                    id: documento.id,
                    ...documento.data()
                }));

                setCupones(lista);
            } catch (error) {
                setError("No se pudieron cargar los cupones");
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        obtenerCupones();
    }, []);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
        setError("");
        setMensaje("");
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        const codigoNormalizado = datosForm.codigo.trim().toUpperCase();
        const porcentaje = Number(datosForm.descuento);

        if (!codigoNormalizado || datosForm.descuento === "") {
            setError("Completá todos los campos");
            return;
        }

        if (porcentaje < 1 || porcentaje > 100) {
            setError("El descuento debe estar entre 1 y 100");
            return;
        }

        const codigoRepetido = cupones.some((cupon) =>
            cupon.codigo === codigoNormalizado && cupon.id !== cuponAEditar?.id
        );

        if (codigoRepetido) {
            setError("Ya existe un cupón con ese código");
            return;
        }

        const datosCupon = {
            codigo: codigoNormalizado,
            descuento: porcentaje
        };

        setGuardando(true);
        setError("");
        setMensaje("");

        try {
            if (cuponAEditar) {
                await updateDoc(doc(db, "cupones", cuponAEditar.id), datosCupon);
                setCupones((cuponesActuales) =>
                    cuponesActuales.map((cupon) =>
                        cupon.id === cuponAEditar.id
                            ? { ...cupon, ...datosCupon }
                            : cupon
                    )
                );
                setMensaje("Cupón actualizado correctamente");
            } else {
                const cuponRef = await addDoc(collection(db, "cupones"), datosCupon);
                setCupones((cuponesActuales) => [
                    ...cuponesActuales,
                    { id: cuponRef.id, ...datosCupon }
                ]);
                setMensaje("Cupón creado correctamente");
            }

            setDatosForm(estadoInicial);
            setCuponAEditar(null);
        } catch (error) {
            setError("No se pudo guardar el cupón");
            console.error(error);
        } finally {
            setGuardando(false);
        }
    };

    const editarCupon = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento
        });
        setError("");
        setMensaje("");
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
        setError("");
    };

    const eliminarCupon = async () => {
        if (!cuponAEliminar) return;

        setEliminando(true);
        setError("");
        setMensaje("");

        try {
            await deleteDoc(doc(db, "cupones", cuponAEliminar.id));
            setCupones((cuponesActuales) =>
                cuponesActuales.filter((cupon) => cupon.id !== cuponAEliminar.id)
            );

            if (cuponAEditar?.id === cuponAEliminar.id) {
                cancelarEdicion();
            }

            setCuponAEliminar(null);
            setMensaje("Cupón eliminado correctamente");
        } catch (error) {
            setError("No se pudo eliminar el cupón");
            console.error(error);
        } finally {
            setEliminando(false);
        }
    };

    if (cargando) return <Cargando mensaje="Cargando cupones..." />;

    return (
        <section>
            <Seo
                titulo="Gestión de cupones"
                descripcion="Administración de cupones de descuento de FunkoManía."
            />
            <h2>Gestión de Cupones</h2>

            <form className="cupon-form" onSubmit={manejarEnvio} noValidate>
                <div>
                    <label htmlFor="codigo">Código:</label>
                    <input
                        id="codigo"
                        type="text"
                        name="codigo"
                        placeholder="Ejemplo: VERANO10"
                        value={datosForm.codigo}
                        onChange={manejarCambio}
                    />
                </div>

                <div>
                    <label htmlFor="descuento">Descuento:</label>
                    <input
                        id="descuento"
                        type="number"
                        name="descuento"
                        min="1"
                        max="100"
                        placeholder="Porcentaje"
                        value={datosForm.descuento}
                        onChange={manejarCambio}
                    />
                </div>

                <div className="cupon-form__acciones">
                    <button type="submit" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : cuponAEditar ? "Actualizar cupón" : "Crear cupón"}
                    </button>

                    {cuponAEditar && (
                        <button type="button" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {mensaje && <p className="mensaje-exito" role="status">{mensaje}</p>}
            {error && <p className="mensaje-error" role="alert">{error}</p>}

            <h3>Listado de cupones</h3>

            {cupones.length === 0 ? (
                <p>Todavía no hay cupones creados.</p>
            ) : (
                <div className="cupones-lista">
                    {cupones.map((cupon) => (
                        <article className="cupon-card" key={cupon.id}>
                            <p><strong>Código:</strong> {cupon.codigo}</p>
                            <p><strong>Descuento:</strong> {cupon.descuento}%</p>
                            <div className="cupon-card__acciones">
                                <button type="button" onClick={() => editarCupon(cupon)}>
                                    <FaEdit aria-hidden="true" /> Editar
                                </button>
                                <Button
                                    variant="danger"
                                    type="button"
                                    onClick={() => setCuponAEliminar(cupon)}
                                >
                                    <FaTrash aria-hidden="true" /> Eliminar
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <Modal
                show={Boolean(cuponAEliminar)}
                onHide={() => setCuponAEliminar(null)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Seguro que querés eliminar el cupón {cuponAEliminar?.codigo}?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setCuponAEliminar(null)}
                        disabled={eliminando}
                    >
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={eliminarCupon} disabled={eliminando}>
                        {eliminando ? "Eliminando..." : "Eliminar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default GestionCupones;
