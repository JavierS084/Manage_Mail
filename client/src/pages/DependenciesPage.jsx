
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DependenciesCard from "../components/DependenciesCard";
import DependenciesForm from "../components/DependenciesForm";
import { useDependencies } from "../context/DependenciesContext";
import DependenciesSearch from "../components/DependenciesSearch";

export function DependenciesPage() {
  const { dependencies, loadDependencies, msg } = useDependencies();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDependencies();
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (dependencies.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No existe dependencias disponibles</h1>
          </div>
        </div>
      );
    } else {
      return <DependenciesCard dependencies={dependencies} />;
    }
  }

  return (
    <div className="card">
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
  );
}
export default DependenciesPage;