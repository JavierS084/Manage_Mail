import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "react-toastify/dist/ReactToastify.css";
import MailForm from "../components/Mails/MailForm";
import MailCard from "../components/Mails/MailCard";
import { useMails } from "../context/MailsContext";

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
    renderlista();
    return () => clearTimeout(timer);
  }, [msg, msgError]);

  function renderlista() {
    if (!mails.length) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return <MailCard mails={mails} />;
    }
  }
  //
  return (
    <div className="container pt-4">
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
    
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MailsPage;
