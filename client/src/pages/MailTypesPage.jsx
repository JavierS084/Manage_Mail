import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MailTypesForm from "../components/MailTypes/MailTypesForm";
import MailTypesCard from "../components/MailTypes/MailTypesCard";
import { useMailTypes } from "../context/MailTypeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function MailTypesPage() {
  const { mailTypes, loadTypes, msg, msgError } = useMailTypes();

  useEffect(() => {

    if (msg) {
      toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }

    const timer = setTimeout(() => {
      loadTypes();
    }, 200);

    return () => clearTimeout(timer);
  }, [msg, msgError]);

  function renderlista() {
    if (mailTypes.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">
              No existen tipos de correos disponibles
            </h1>
          </div>
        </div>
      );
    } else {
      return <MailTypesCard mailTypes={mailTypes} />;
    }
  }

  return (
    <div>
      <ToastContainer />
      <Tabs
        defaultActiveKey="listMailtypes"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="listMailtypes" title="Tipo de Correo">
          <div
            className="tab-pane fade active show"
            id="listaSolicituds"
            role="tabpanel"
          >
            <article>{renderlista()}</article>
          </div>
        </Tab>
        <Tab eventKey="addtype" title="Crear Tipo de correo">
          <div
            className="tab-pane fade active show"
            id="createRequest"
            role="tabpanel"
          >
            {<MailTypesForm />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MailTypesPage;
