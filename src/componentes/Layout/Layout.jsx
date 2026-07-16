import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export function Layout () {
  return (
    <div className="aplicacion">
      <Header />
      <main className="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
    );
}
