import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMails } from "../../context/MailsContext";
export function MailDetail() {
  const { gtMailDetail } = useMails();
  const params = useParams();

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

  useEffect(() => {
    const loadMailDetail = async () => {
      if (params && params.id) {
        const MailDetail = await gtMailDetail(params.id);
        setMailDetail({
          user: MailDetail.user,
          solicitante: MailDetail.solicitante,
          dateInicial: MailDetail.dateInicial,
          dateFinal: MailDetail.dateFinal,
          dateSolicitud: MailDetail.dateSolicitud,
          state: MailDetail.state,
          observation: MailDetail.observation,
          mailTypeId: MailDetail.mailType.tipo,
          groupId: MailDetail.group.description,
          dependencyId: MailDetail.dependency.dependencia,
          requestId: MailDetail.request.solicitud,
        });
      }
    };
    loadMailDetail();
  }, []);
  return (
    <div className="row">
      <div className="card">
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Correo: </label>
          <p className="col-8 pt-2 ">Hola que tal</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Estado:</label>
          <p className="col-8 pt-2">Hola que tal</p>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Tipo de Correo:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Formato de Solicitud:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2"> Dependencia:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Solicitud:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Registro:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Fecha de Expiracion:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Grupo:</label>
        </div>
        <div className="form-group d-flex align-items-center p-2">
          <label className="form-label mx-2">Observacion:</label>
        </div>
      </div>
    </div>
  );
}

export default MailDetail;
