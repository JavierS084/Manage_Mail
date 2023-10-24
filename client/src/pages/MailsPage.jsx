import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MailForm from "../components/Mails/MailForm";
import MailCard from "../components/Mails/MailCard";
import { useMails } from "../context/MailsContext";
import MailSearch from "../components/Mails/MailSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Orbit } from "@uiball/loaders";

export function MailsPage() {
  const { mails, loadMails, msg, msgError } = useMails();

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
      loadMails();
    }, 500);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (!mails.length) {
      return (
        <div className="card">
          <div className="card-body">
          <Orbit size={25} speed={1.5} color="gray" />
            <h1 className="card-title">No existe correos disponibles</h1>
          </div>
        </div>
      );
    } else {
      return <MailCard mails={mails} />;
    }
  }
  //
  return (
    <div className="container-fluid pt-4">
      <div className="card">
        <ToastContainer />
        <div className="card-body">
          <Tabs
            defaultActiveKey="listMail"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="listMail" title="Correos">
              <div
                className="tab-pane fade active show"
                id="listaCorreos"
                role="tabpanel"
              >
                <article>{renderlista()}</article>
              </div>
            </Tab>
            <Tab eventKey="addmail" title="Crear Correo">
              <div
                className="tab-pane fade active show"
                id="createRequest"
                role="tabpanel"
              >
                {<MailForm />}
              </div>
            </Tab>
            <Tab eventKey="searchMail" title="Buscar Correo">
              <div
                className="tab-pane fade active show"
                id="searchCorreos"
                role="tabpanel"
              >
                <article>{<MailSearch />}</article>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MailsPage;
