
/*import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/navigation";
import { useGroups } from "@/context/GroupsContext";

export default function GroupCard({ groups }) {
  const { delGroup } = useGroups();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

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
    const datosOrdenados = [...requests];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setRequest(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Lista de Grupos</h2>
          <div className="col-md-5">
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
              onClick={() => router.push(`/groups/edit/${select}`)}
            >
              Editar
            </button>
          </div>
          <table className="table table-hover mt-2">
            <thead>
              <tr>
                <th scope="col">Accion</th>
                <th scope="col">ID</th>
                <th scope="col" onClick={() => Orden("id")}>
                  Correo del Grupo
                </th>
                <th className="col"> Detalle del Grupo</th>
                <th className="col">Fecha de Vinculacion</th>
                <th className="col">Fecha de Desvinculacion</th>
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <tr scope="row" key={group.id}>
                  <td>
                    <input
                      onChange={handleChange}
                      className="form-check-input"
                      type="checkbox"
                      value={group.id}
                      id="flexCheckDefault"
                      key={group.id}
                    />
                  </td>

                  <td>{group.id}</td>
                  <td>{group.email}</td>
                  <td>{group.description}</td>
                  <td>{group.dateInicialG}</td>
                  {output >= group.dateFinalG ? (
                    <td id="fechared">
                      {group.dateFinalG}
                    </td>
                  ) : (
                    <td>{group.dateFinalG}</td>
                  )}
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
                  delRequest(select);
                  setSelect([]);
                  toast.success("Se ha eliminado Correctamente");
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
*/