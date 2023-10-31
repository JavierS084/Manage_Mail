import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal } from "react-bootstrap";
import { IconArrowsMoveVertical } from "@tabler/icons-react";
//import Modal from "react-bootstrap";
import { useDependencies } from "../../context/DependenciesContext";

export default function DependenciesCard({ dependencies }) {
  const { delDp, setDependencies } = useDependencies();

  const [accion, setAccion] = useState(false); //estado de boton eliminar
  const [accionEdit, setAccionEdit] = useState(false); //estado de boton editar

  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
/***Buscador */
  const [filteredData, setFilteredData] = useState(dependencies);
  const [wordEntered, setWordEntered] = useState("");

/***Modal */
  const [show, setShow] = useState(false); //modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
/***Paginacion */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Esto calcula los elementos que se deben mostrar en la página actual
   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); //calcula a traves del filtrado de datos

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

  const navigate = useNavigate();

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
    setFilteredData(dependencies);
    setWordEntered("");
  }, [dependencies]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = dependencies.filter((dependency) => {
      return dependency.dependencia
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(dependencies);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
    //console.log(value )
    if (checked) {
      setSelect([...select, value]);

      setAccion(checked);
    } else {
      //pasa todos los datos menos los selecionados
      setSelect(select.filter((o) => o !== value));
    }
  };

  function Orden(columna) {
    const datosOrdenados = [...dependencies];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setDependencies(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Lista de Dependencias</h2>
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
              onClick={() => navigate(`/dependency/edit/${select}`)}
            >
              Editar
            </button>
          </div>
          <div className="row justify-content-end">
            <form className="col-5">
              <input
                className="form-control"
                type="text"
                placeholder="Ej: Secretaria..."
                value={wordEntered}
                onChange={handleFilter}
              />
            </form>
          </div>
          {filteredData.length !== 0 && (
            <table className="table table-hover mt-2">
              <thead>
                <tr>
                  <th scope="col">Accion</th>
                  <th scope="col">ID</th>
                  <th scope="col" onClick={() => Orden("id")}>
                    Dependencia
                    <IconArrowsMoveVertical size={16} color="gray" />
                  </th>
                  <th scope="col">Fecha de Creacion</th>
                </tr>
              </thead>

              <tbody>
              {currentItems.map((dependency) =>  (
                  <tr scope="row" key={dependency.id}>
                    <td>
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="checkbox"
                        value={dependency.id}
                        id="flexCheckDefault"
                      />
                    </td>
                    <td>{dependency.id}</td>
                    <td>{dependency.dependencia}</td>
                    <td>{dependency.createdAt}</td>
                  </tr>
                ))}
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
                  delDp(select);
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
