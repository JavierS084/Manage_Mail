import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Orbit } from "@uiball/loaders";
import { useAdministrations } from "../context/AdministrationsContext";
import AdministrationForm from "../components/Administrations/AdministrationsForm";
import AdministrationCard from "../components/Administrations/AdministrationsCard";
//import AdministrationNotification from "@/components/AdministrationNotification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AdministrationsPage() {
  const { administrations, loadUsers, msg, msgError } = useAdministrations();

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
      loadUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (administrations.length === 0) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return <AdministrationCard administrations={administrations} />;
    }
  }

  return (
    <div className="container pt-4">
      <div className="card">
        <ToastContainer />
        <div className="card-body">
          <Tabs
            defaultActiveKey="listaUsers"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="listaUsers" title="Lista de Usuarios">
              <div
                className="tab-pane fade active show"
                id="listaUsers"
                role="tabpanel"
              >
                {renderlista()}
              </div>
            </Tab>
            <Tab eventKey="crearUsers" title="Crear Usuarios">
              <AdministrationForm />
            </Tab>
            <Tab eventKey="notification" title="Notificacion"></Tab>
            <Tab eventKey="administracion" title="Administracion"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdministrationsPage;
