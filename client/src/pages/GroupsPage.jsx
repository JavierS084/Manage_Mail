import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GroupCard from "../components/Groups/GroupsCard";
import GroupForm from "../components/Groups/GroupsForm";
import { useGroups } from "../context/GroupsContext";
import { ToastContainer, toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";
import "react-toastify/dist/ReactToastify.css";

export function GroupsPage() {
  const { groups, loadGroups, msg, msgError } = useGroups();

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
      loadGroups();
    }, 500);

    return () => clearTimeout(timer);
  }, [msg, msgError]);

  function renderlista() {
    if (!groups.length) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return <GroupCard groups={groups} />;
    }
  }

  return (
    <div className="container pt-4">
      <div className="card">
        <ToastContainer />
        <div className="card-body">
          <Tabs
            defaultActiveKey="groupsList"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="groupsList" title="Grupos">
              <div
                className="tab-pane fade active show"
                id="listaGrupos"
                role="tabpanel"
              >
                <article>{renderlista()}</article>
              </div>
            </Tab>
            <Tab eventKey="addDependency" title="Crear Grupos">
              <div
                className="tab-pane fade active show"
                id="createRequest"
                role="tabpanel"
              >
                {<GroupForm />}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default GroupsPage;
