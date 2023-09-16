import { Link } from "react-router-dom";
import DrawerNav from "../Drawer/DrawerNav";
import DrawerNotification from "../Drawer/DrawerNotification";

export function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Manage Mail
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Inicio <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mails">
                Correos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dependencies">
                Dependencias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groups">
                Grupos
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Otros
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/requests">
                  Formato de Solicitud
                </Link>
                <Link className="dropdown-item" to="/mail-types">
                  Tipo de Correo
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/administrations">
                Administración
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            
            <DrawerNotification/>
            <DrawerNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
