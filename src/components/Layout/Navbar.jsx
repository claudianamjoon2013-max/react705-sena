import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-lista">
        <li>
          <Link className="navbar-item" to="/escenario">
            Diviértete
          </Link>
        </li>
        <li>
          <Link className="navbar-item" to="/catalogo">
            Catálogo
          </Link>
        </li>
        <li>
          <Link className="navbar-item" to="/contacto">
            Contáctame
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;