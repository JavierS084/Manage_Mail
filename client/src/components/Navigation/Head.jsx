//import { useState } from "react";
import {Link } from "react-router-dom";/*
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IconHomeCog, IconUserCircle, IconLogout } from "@tabler/icons-react";*/

export default function Head() {
  /*
  const options = [
    {
      name: "end",
      scroll: true,
      backdrop: true,
    },
  ];

  function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
      <>
        <Button variant="primary" onClick={toggleShow} className="me-2">
          <IconHomeCog color="white" size={24} />
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <IconUserCircle color="blue" size={24} />
            <Offcanvas.Title> Perfil</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>User name</p>
            <div className="d-flex align-items-end flex-column">
              <div className="mt-auto p2">
                <p>
                  Salir
                  <IconLogout
                    className="justify-content-end pl-4"
                    color="blue"
                    size={24}
                  />
                </p>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  function Example() {
    return (
      <>
        {["end"].map((placement, idx) => (
          <OffCanvasExample key={idx} placement={placement} name={placement} />
        ))}
      </>
    );
  }
*/
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mail System
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
              <Link className="nav-link" to="/">
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
                <Link className="dropdown-item" to="/request">
                  Formato de Solicitud
                </Link>
                <Link className="dropdown-item" to="/mail-type">
                  Tipo de Correo
                </Link>
                
              </div>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link" to="/administration">
                Administracion
              </Link>
            </li>
          </ul>
          <form className="d-flex">
           
          </form>
        </div>
      </div>
    </nav>
  );
}
