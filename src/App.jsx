import { Routes, Route } from "react-router-dom";
import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import FormularioContainer from "./componentes/FormularioProductos/FormularioContainer";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Carrito from "./componentes/Carrito/Carrito";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <h1>Bienvenido a la pagina</h1>
              <p>Estos son algunos de nuestros productos destacados.</p>
              <ItemListContainer mensaje="productos destacados" />
            </>
          }
        />
        <Route path="/productos" element={<ItemListContainer mensaje="productos" />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/agregar-producto" element={<FormularioContainer />} />
      </Route>
    </Routes>
  );
}

export default App;
