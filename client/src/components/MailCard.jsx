/*
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useMails } from "@/context/MailsContext";

export default function MailCard({ mails }) {
  const { delMail, setMails } = useMails();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  //const [ selectedit , setSelectedit] = useState();
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
      <div className="card ">
        <div className="card-body">
          <h2 className="card-title">Lista de Correos</h2>
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
              onClick={() => router.push(`/mails/edit/${select}`)}
            >
              Editar
            </button>
          </div>
          <table className="table table-hover mx-auto mt-2">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">ID</th>
                <th scope="col" onClick={() => Orden("id")}>
                  Correo
                </th>
                <th className="col">Dependencia</th>
                <th className="col">Grupo</th>
                <th className="col">Tipo de Correo</th>
                <th className="col">Formato </th>
                <th className="col">Solicitud</th>
                <th className="col">Inicio</th>
                <th className="col">Fin</th>
              </tr>
            </thead>

            <tbody>
              {mails.map((mail) => (
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
                  <td>{mail.user}</td>
                  <td>{mail.dependency.dependencia}</td>
                  {mail.group ? (
                    <td className="ml-2 text-center">
                      {mail.group.description}
                    </td>
                  ) : (
                    <td>Sin Grupo</td>
                  )}
                  <td>{mail.mailType.tipo}</td>
                  <td>{mail.request.solicitud}</td>
                  <td>{mail.dateSolicitud}</td>
                  <td>{mail.dateInicial}</td>
                  {output >= mail.dateFinal ? (
                    <td id="fechared">{mail.dateFinal}</td>
                  ) : (
                    <td>{mail.dateFinal}</td> 
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
                  delMail(select);
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