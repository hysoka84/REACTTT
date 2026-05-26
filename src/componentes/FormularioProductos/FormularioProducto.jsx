import React from 'react';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
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
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input type="text" placeholder="Ej: Teclado Mecanico"  name='nombre' value={datosForm.nombre} onChange={manejarCambio}/>
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" placeholder="Ej: 95" name='precio' value={datosForm.precio} onChange={manejarCambio}/>
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" placeholder="Ej: 5" name='stock' value={datosForm.stock} onChange={manejarCambio}/>
            </div>
            <div>
                <label>URL de imagen:</label>
                <input type="text" placeholder="https://..." name='urlImagen' value={datosForm.urlImagen} onChange={manejarCambio} />
            </div>
            <button type="submit">Guardar Producto</button>
        </form>
    );
}

export default FormularioProducto;
