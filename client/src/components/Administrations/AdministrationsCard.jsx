import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useAdministrations } from "../../context/AdministrationsContext";

function AdministrationCard({ administrations }) {
  const { delUser, setAdministrations } = useAdministrations();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    //pasando los 10 segundos se deshabilita el boton eliminar
    const timer = setTimeout(() => {
      setAccion(false);
    }, 10000);
    if (select.length === 0) {
      setAccion(false);
    }

    return () => clearTimeout(timer);
  }, [select]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    //console.log(value )
    if (checked) {
      setSelect([...select, value]);
      //console.log(value);
      setAccion(checked);
    } else {
      //pasa todos los datos menos los selecionados
      setSelect(select.filter((o) => o !== value));
    }
  };

  function Orden(columna) {
    const datosOrdenados = [...administrations];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setAdministrations(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Lista de Usuarios</h2>
        <button
          onClick={handleShow}
          disabled={!accion}
          type="button"
          className="btn btn-danger m-1"
        >
          Eliminar
        </button>
        <button
          type="button"
          className="btn btn-warning m-1 px-4"
          disabled={!accion}
          onClick={() => navigate(`administration/edit/${select}`)}
        >
          Editar
        </button>
        <table className="table table-hover mt-2">
          <thead>
            <tr>
              <th scope="col">Accion</th>
              <th scope="col">ID</th>
              <th scope="col" onClick={() => Orden("id")}>
                Nombre Completo
              </th>
              <th scope="col">Correo</th>
              <th scope="col">Tipo de Usuario</th>
              <th scope="col">Fecha de Creacion</th>
            </tr>
          </thead>

          <tbody>
            {administrations.map((user) => (
              <tr scope="row" key={user.id}>
                <td>
                  <input
                    onChange={handleChange}
                    className="form-check-input"
                    type="checkbox"
                    value={user.uuid}
                    id="flexCheckDefault"
                  />
                </td>

                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Realmente deseas eliminar? Este proceso no se puede deshacer.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                delUser(select);
                setSelect([]);

                handleClose();
              }}
              type="button"
            >
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdministrationCard;
