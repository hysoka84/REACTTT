import { Routes, Route } from "react-router-dom";
import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import FormularioContainer from "./componentes/FormularioProductos/FormularioContainer";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Carrito from "./componentes/Carrito/Carrito";
import AuthForm from "./componentes/Auth/AuthForm";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import Seo from "./componentes/Seo/Seo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Seo
                titulo="Inicio"
                descripcion="Tienda de Funkos de películas, series, videojuegos y deportes."
              />
              <section className="presentacion">
                <p className="presentacion__etiqueta">Coleccionables para todos</p>
                <h1>Bienvenido a FunkoManía</h1>
                <p>Encontrá personajes de películas, series y videojuegos.</p>
              </section>
              <ItemListContainer mensaje="Funkos destacados" />
            </>
          }
        />
        <Route path="/productos" element={<ItemListContainer mensaje="Todos los Funkos" />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<AuthForm modo="login" />} />
        <Route path="/registro" element={<AuthForm modo="registro" />} />
        <Route element={<ProtectedRoute soloAdmin />}>
          <Route path="/agregar-producto" element={<FormularioContainer />} />
          <Route path="/editar-producto/:id" element={<FormularioContainer />} />
          <Route
            path="/gestion"
            element={<ItemListContainer mensaje="Gestión de productos" administrar />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
