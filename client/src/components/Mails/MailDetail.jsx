import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { Orbit } from "@uiball/loaders";
import { useMails } from "../../context/MailsContext";
export function MailDetail({ idDetail }) {
  const { gtMailDetail } = useMails();

  //const params = useParams();

  const [mailDetail, setMailDetail] = useState({
    user: "",
    solicitante: "Talento Humano",
    dateInicial: "",
    state: "",
    observation: "",
    dateFinal: "",
    dateSolicitud: "",
    mailTypeId: "",
    groupId: "",
    dependencyId: "",
    requestId: "",
    
  });

  const {
    user,
    solicitante,
    dateFinal,
    dateInicial,
    dateSolicitud,
    state,
    observation,
    mailTypeId,
    groupId,
    dependencyId,
    requestId,

  } = mailDetail;

  useEffect(() => {
    const loadMailDetail = async () => {
      if (idDetail) {
        const MailDetail = await gtMailDetail(idDetail);
        setMailDetail({
          user: MailDetail.user,
          solicitante: MailDetail.solicitante,
          dateInicial: MailDetail.dateInicial,
          dateFinal: MailDetail.dateFinal,
          dateSolicitud: MailDetail.dateSolicitud,
          state: MailDetail.state,
          observation: MailDetail.observation,
          mailTypeId: MailDetail.mailType.tipo ,
          groupId: MailDetail.group ? MailDetail.group.description : "" ,
          dependencyId: MailDetail.dependency.dependencia,
          requestId: MailDetail.request.solicitud,
          
        });
      }
    };
    loadMailDetail();
  }, []);

  return (
    <div className="row">
      { mailDetail && mailDetail.user ? (
        <div className="card">
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Solicitante: </label>
          <p className="col-8 pt-2 ">{solicitante}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Correo: </label>
          <p className="col-8 pt-2 ">{user}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Estado:</label>
          {state ? (
            <p className="col-8 pt-2 ">Activo</p>
          ) : (
            <p className="col-8 pt-2 ">Suspendido</p>
          )}
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Tipo de Correo:</label>
          <p className="col-8 pt-2 ">{mailTypeId}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Formato de Solicitud:</label>
          <p className="col-8 pt-2 ">{requestId}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2"> Dependencia:</label>
          <p className="col-8 pt-2 ">{dependencyId}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Grupo:</label>
          {
            groupId ? (

              <p className="col-8 pt-2 ">{groupId}</p>
            ):(
              <p className="col-8 pt-2 ">No pertenece a ningun grupo</p>
            )
          }
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Solicitud:</label>
          <p className="col-8 pt-2 ">{dateSolicitud}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Registro:</label>
          <p className="col-8 pt-2 ">{dateInicial}</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Expiración:</label>
          {dateFinal ? (
            <p className="col-8 pt-2 ">{dateFinal}</p>
          ) : (
            <p className="col-8 pt-2 ">Sin fecha de finalización</p>
          )}
        </div>
     

        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Observación:</label>
          <p className="col-8 pt-2 ">{observation}</p>
        </div>
      </div>
      ):(
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      )

    }
      
    </div>
  );
}

export default MailDetail;
