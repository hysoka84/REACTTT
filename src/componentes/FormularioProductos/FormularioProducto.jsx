import React from 'react';

export function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarEnvio,
    enviando,
    mensaje,
    error,
    errores,
    modoEdicion
}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };
    return (
        <form style={formStyle} onSubmit={manejarEnvio} noValidate>
            <h3>{modoEdicion ? 'Editar Funko' : 'Agregar un nuevo Funko'}</h3>
            <div>
                <label htmlFor="nombre">Nombre del Funko:</label>
                <input id="nombre" type="text" placeholder="Ej: Spider-Man" name="nombre" value={datosForm.nombre} onChange={manejarCambio} aria-invalid={Boolean(errores.nombre)} aria-describedby="error-nombre" />
                {errores.nombre && <p id="error-nombre" className="campo-error">{errores.nombre}</p>}
            </div>
            <div>
                <label htmlFor="precio">Precio:</label>
                <input id="precio" type="number" placeholder="Ej: 25000" name="precio" value={datosForm.precio} onChange={manejarCambio} aria-invalid={Boolean(errores.precio)} aria-describedby="error-precio" />
                {errores.precio && <p id="error-precio" className="campo-error">{errores.precio}</p>}
            </div>
            <div>
                <label htmlFor="stock">Stock:</label>
                <input id="stock" type="number" placeholder="Ej: 5" name="stock" value={datosForm.stock} onChange={manejarCambio} aria-invalid={Boolean(errores.stock)} aria-describedby="error-stock" />
                {errores.stock && <p id="error-stock" className="campo-error">{errores.stock}</p>}
            </div>
            <div>
                <label htmlFor="imagen">URL de imagen:</label>
                <input id="imagen" type="text" placeholder="/images/funko.jfif" name="imagen" value={datosForm.imagen} onChange={manejarCambio} aria-invalid={Boolean(errores.imagen)} aria-describedby="error-imagen" />
                {errores.imagen && <p id="error-imagen" className="campo-error">{errores.imagen}</p>}
            </div>
            <button type="submit" disabled={enviando}>
                {enviando
                    ? 'Guardando...'
                    : modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
            </button>
            {mensaje && <p className="mensaje-exito">{mensaje}</p>}
            {error && <p className="mensaje-error">{error}</p>}
        </form>
    );
}

export default FormularioProducto;
