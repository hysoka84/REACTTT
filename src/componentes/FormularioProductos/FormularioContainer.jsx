import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FormularioProducto } from '../FormularioProductos/FormularioProducto';
import { db } from '../../firebase/config';
import Seo from '../Seo/Seo';
import Cargando from '../Cargando/Cargando';

export function FormularioContainer() {
    const { id } = useParams();
    const modoEdicion = Boolean(id);
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        imagen: ''
    });
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(modoEdicion);

    useEffect(() => {
        if (!modoEdicion) {
            return;
        }

        const obtenerProducto = async () => {
            try {
                const productoSnapshot = await getDoc(doc(db, 'productos', id));

                if (productoSnapshot.exists()) {
                    const producto = productoSnapshot.data();
                    setDatosForm({
                        nombre: producto.nombre,
                        precio: producto.precio,
                        stock: producto.stock,
                        imagen: producto.imagen
                    });
                } else {
                    setError('Producto no encontrado');
                }
            } catch (error) {
                setError('No se pudo cargar el producto');
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        obtenerProducto();
    }, [id, modoEdicion]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
        setErrores((erroresActuales) => ({
            ...erroresActuales,
            [name]: ''
        }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!datosForm.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }

        if (datosForm.precio === '' || Number(datosForm.precio) <= 0) {
            nuevosErrores.precio = 'El precio debe ser mayor que cero';
        }

        if (datosForm.stock === '' || Number(datosForm.stock) < 0) {
            nuevosErrores.stock = 'El stock no puede ser negativo';
        }

        if (!datosForm.imagen.trim()) {
            nuevosErrores.imagen = 'La imagen es obligatoria';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setEnviando(true);
        setMensaje('');
        setError('');

        const productoNuevo = {
            nombre: datosForm.nombre,
            precio: Number(datosForm.precio),
            stock: Number(datosForm.stock),
            imagen: datosForm.imagen
        };

        try {
            if (modoEdicion) {
                await updateDoc(doc(db, 'productos', id), productoNuevo);
                setMensaje('Producto actualizado correctamente');
            } else {
                await addDoc(collection(db, 'productos'), productoNuevo);
                setMensaje('Producto agregado correctamente');
                setDatosForm({ nombre: '', precio: '', stock: '', imagen: '' });
            }
        } catch (error) {
            setError(modoEdicion
                ? 'No se pudo actualizar el producto'
                : 'No se pudo agregar el producto');
            console.error(error);
        } finally {
            setEnviando(false);
        }
    };

    if (cargando) {
        return <Cargando mensaje="Cargando producto..." />;
    }

    return (
        <>
            <Seo
                titulo={modoEdicion ? "Editar producto" : "Agregar producto"}
                descripcion="Formulario de administración de productos de FunkoManía."
            />
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                enviando={enviando}
                mensaje={mensaje}
                error={error}
                errores={errores}
                modoEdicion={modoEdicion}
            />
        </>
    );
}

export default FormularioContainer;
