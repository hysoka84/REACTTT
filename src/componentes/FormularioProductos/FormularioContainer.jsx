// En src/contenedores/FormularioContainer/FormularioContainer.jsx
import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProductos/FormularioProducto';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: ''
    });
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarEnvio = (evento) => {
        evento.preventDefault();
        console.log('Producto cargado desde el formulario:', datosForm);
    };
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
        />
    );
}

export default FormularioContainer;
