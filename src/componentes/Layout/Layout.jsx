import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export function Layout () {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
    );
}
