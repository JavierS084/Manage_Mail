
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RequestForm from "../components/RequestForm";
import RequestCard from "../components/RequestCard";
import { useRequests } from "../../context/RequestsContext";

function Request() {
  const { requests, loadRequests, msg } = useRequests();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadRequests();
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (requests.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No existe solicitudes disponibles</h1>
            
          </div>
        </div>
      );
    } else {
      return <RequestCard requests={requests} />;
    }
  }

  return (
    <div>
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
  );
}

export default Request;
