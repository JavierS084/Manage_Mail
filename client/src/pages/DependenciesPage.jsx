import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ToastContainer, toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";
import "react-toastify/dist/ReactToastify.css";
import DependenciesCard from "../components/Dependencies/DependenciesCard";
import DependenciesForm from "../components/Dependencies/DependenciesForm";
import { useDependencies } from "../context/DependenciesContext";
import DependenciesSearch from "../components/Dependencies/DependenciesSearch";

export function DependenciesPage() {
  const { dependencies, loadDependencies, msg, msgError } = useDependencies();

  useEffect(() => {
    if (msg) {
     toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
      loadDependencies();
    }, 500);
    renderlista();
    return () => clearTimeout(timer);
  }, [msg]);

function renderlista() {
    if (!dependencies.length) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return  <DependenciesCard dependencies={dependencies} />;
    }
  }

  return (
    <div className="container pt-4">
      <div className="card">
        <ToastContainer />
        <div className="card-body">
          <Tabs
            defaultActiveKey="listDependencies"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="listDependencies" title="Dependencias">
              <div
                className="tab-pane fade active show"
                id="listadependencias"
                role="tabpanel"
              >
                <article>{renderlista()}</article>
              </div>
            </Tab>
            <Tab eventKey="addDependency" title="Crear Dependencia">
              <div
                className="tab-pane fade active show"
                id="createdependencies"
                role="tabpanel"
              >
                {<DependenciesForm />}
              </div>
            </Tab>
            <Tab eventKey="searchDependencia" title="Buscar Dependencia">
              <div
                className="tab-pane fade active show"
                id="searchdependencias"
                role="tabpanel"
              >
                {<DependenciesSearch />}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default DependenciesPage;
