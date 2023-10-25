import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useMails } from "../../context";

export function MailCard({ mails }) {
  const navigate = useNavigate();

  const { delMail, setMails } = useMails();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [filteredData, setFilteredData] = useState(mails);
  const [wordEntered, setWordEntered] = useState("");

  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    date.getFullYear();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = mails.filter((mail) => {
      return mail.user.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(mails);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    //pasando los 10 segundos se deshabilita el boton eliminar
    const timer = setTimeout(() => {
      setAccion(false);
    }, 10000);
    if (select.length === 0) {
      setAccion(false);
    }

    return () => clearTimeout(timer);
  }, [select]); //se refrezca por cada actualizacion

  const handleChange = (event) => {
    const { value, checked } = event.target;
    //console.log(value )
    if (checked) {
      setSelect([...select, value]);
      console.log(value);
      setAccion(checked);
    } else {
      //pasa todos los datos menos los selecionados
      setSelect(select.filter((o) => o !== value));
    }
  };

  function Orden(columna) {
    const datosOrdenados = [...mails];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setMails(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Lista de Correos</h2>
          <div className="row col-md-12">
            <div className="col-sm-1">
              <button
                onClick={handleShow}
                disabled={!accion}
                type="button"
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-warning "
                disabled={!accion}
                onClick={() => navigate(`/mails/edit/${select}`)}
              >
                Editar
              </button>
            </div>

            <div className="row justify-content-end">
              <form className="col-5">
                <input
                  className="form-control"
                  type="text"
                  autoFocus={true}
                  placeholder="Search..."
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </form>
            </div>
          </div>
          {filteredData.length !== 0 && (
          <table className="table table-hover mx-auto mt-2">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">ID</th>
                <th scope="col" onClick={() => Orden("id")}>
                  Correo
                </th>
                <th className="col">Dependencia</th>

                <th className="col">Solicitud</th>
                <th className="col">Inicio</th>
                <th className="col">Fin</th>
              </tr>
            </thead>

            <tbody>
            {filteredData.slice(0, 15).map((mail) => {
                return (
                  <tr scope="row" key={mail.id}>
                    <td>
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="checkbox"
                        value={mail.id}
                        id="flexCheckDefault"
                        key={mail.id}
                      />
                    </td>

                    <td>{mail.id}</td>
                    <td className="tdSelect" onClick={ () => navigate(`mail/detail/${mail.id}`)}>{mail.user}</td>
                    <td>{mail.dependency.dependencia}</td>

                    <td>{mail.dateSolicitud}</td>
                    <td>{mail.dateInicial}</td>
                    {mail.dateFinal ? (
                      output >= mail.dateFinal ? (
                        <td id="fechared">{mail.dateFinal}</td>
                      ) : (
                        <td>{mail.dateFinal}</td>
                      )
                    ) : (
                      <td>Sin fecha de finalización</td>
                    )}
                  </tr>
                );
                    })}
            </tbody>
          </table>
          )}
         

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
                  delMail(select);
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
    </div>
  );
}
export default MailCard;
