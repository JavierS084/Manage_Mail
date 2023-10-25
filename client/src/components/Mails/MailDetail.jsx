import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  return <form></form>;
}

export default MailDetail;
