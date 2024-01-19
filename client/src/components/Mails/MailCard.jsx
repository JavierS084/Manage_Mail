import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Pagination } from "react-bootstrap";
import { IconArrowsMoveVertical } from "@tabler/icons-react";
import { useMails } from "../../context";
import MailDetail from "./MailDetail";

export function MailCard({ mails }) {
  const navigate = useNavigate();

  const { delMail, setMails } = useMails();
  const [accion, setAccion] = useState(false); //accion de eliminar
  const [accionEdit, setAccionEdit] = useState(false); //estado de boton editar

/**Input de fila seleccionada */
  const [select, setSelect] = useState([]);
  const [idDetail, setIdDetail] = useState(null);

  const [ordenAscendente, setOrdenAscendente] = useState(true);
  /**Buscador */
  const [filteredData, setFilteredData] = useState(mails);
  const [wordEntered, setWordEntered] = useState("");
/**Paginaction */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Esto calcula los elementos que se deben mostrar en la página actual
   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); //calcula a traves del filtrado de datos

  /**Modal de eliminacion */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /**Modal de detalle */

  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };
/**Obtencion de fecha actual */
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    date.getFullYear();



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
      setAccionEdit(false);
    }, 10000);

    if (select.length === 0) {
      setAccion(false);
      setAccionEdit(false);
    } else if (select.length === 1) {
      setAccionEdit(true);
    } else {
      setAccionEdit(false);
    }

    return () => clearTimeout(timer);
  }, [select]); //se refrezca por cada actualizacion

  useEffect(() => {
    setFilteredData(mails);
    setWordEntered("");
  }, [mails]);


  //Obtiene el id del correo para el componente de mailDetail
  const handleClick = (event) => {
    const value = event.target.getAttribute("value");
    setIdDetail(value);
    handleShowDetail();
  };

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


  // Manejar cambio de página
  const handlePageChange = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  //Generar la cantidad de paginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Lista de Correos</h2>
          <div className="row justify-content-start">
            <button
              onClick={handleShow}
              disabled={!accion}
              type="button"
              className="btn btn-danger m-1 col-1"
            >
              Eliminar
            </button>
        
            <button
              type="button"
              className="btn btn-warning m-1 px-4 col-1"
              disabled={!accionEdit}
              onClick={() => navigate(`/mail/edit/${select}`)}
            >
              Editar
            </button>
          </div>
          <div className="row justify-content-end">
            <form className="col-5">
              <input
                className="form-control"
                type="text"
                placeholder="Ej: jperez@uni..."
                value={wordEntered}
                onChange={handleFilter}
              />
            </form>
          </div>
          {filteredData.length !== 0 && (
            <table className="table table-hover mx-auto mt-2">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">ID</th>
                  <th scope="col" onClick={() => Orden("id")}>
                    Correo<IconArrowsMoveVertical size={16} color="gray" />
                  </th>
                  <th className="col">Dependencia</th>
                  <th className="col">Solicitud</th>
                  <th className="col">Inicio</th>
                  <th className="col">Fin</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((mail) => {
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
                      <td
                        className="tdSelect"
                        onClick={handleClick}
                        value={mail.id}
                        disabled={!accion}
                        key={mail.id}
                      >
                        {mail.user}
                      </td>
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
              <nav>
                <ul className="pagination">
                  <select
                    className="selectPage"
                    name="selectPage"
                    onChange={(event) =>
                      setItemsPerPage(parseInt(event.target.value))
                    }
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>

                  <Pagination>
                    <Pagination.First
                      onClick={(event) => handlePageChange(event, 1)}
                    />
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={(event) => handlePageChange(event, number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    <Pagination.Last
                      onClick={(event) =>
                        handlePageChange(event, pageNumbers.length)
                      }
                    />
                  </Pagination>
                </ul>
              </nav>
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

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showDetail}
            onHide={handleCloseDetail}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Detalle de Correo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MailDetail idDetail={idDetail} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseDetail}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default MailCard;
