import Pagination from "react-bootstrap/Pagination";

function Paginador({ paginaActual, totalPaginas, cambiarPagina }) {
    if (totalPaginas <= 1) return null;

    const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1);

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
                disabled={paginaActual === 1}
                onClick={() => cambiarPagina(paginaActual - 1)}
            />

            {paginas.map((pagina) => (
                <Pagination.Item
                    key={pagina}
                    active={pagina === paginaActual}
                    onClick={() => cambiarPagina(pagina)}
                >
                    {pagina}
                </Pagination.Item>
            ))}

            <Pagination.Next
                disabled={paginaActual === totalPaginas}
                onClick={() => cambiarPagina(paginaActual + 1)}
            />
        </Pagination>
    );
}

export default Paginador;
