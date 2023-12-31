import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ToastContainer, toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";
import "react-toastify/dist/ReactToastify.css";
import RequestForm from "../components/Requests/RequestForm";
import RequestCard from "../components/Requests/RequestCard";
import { useRequests } from "../context/RequestsContext";

export function RequestsPage() {
  const { requests, loadRequests, msg, msgError } = useRequests();

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
      loadRequests();
    }, 500);

    return () => clearTimeout(timer);
  }, [msg, msgError]);

  function renderlista() {
    if (!requests.length) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return <RequestCard requests={requests} />;
    }
  }

  return (
    <div className="container pt-4">
      <div className="card">
        <ToastContainer />
        <div className="card-body">
          <Tabs
            defaultActiveKey="listRequest"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="listRequest" title="Solicitudes">
              <div
                className="tab-pane fade active show"
                id="listaSolicituds"
                role="tabpanel"
              >
                <article>{renderlista()}</article>
              </div>
            </Tab>
            <Tab eventKey="addDependency" title="Crear Solicitud">
              <div
                className="tab-pane fade active show"
                id="createRequest"
                role="tabpanel"
              >
                {<RequestForm />}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
