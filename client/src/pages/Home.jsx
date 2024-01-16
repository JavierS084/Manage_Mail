import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Orbit } from "@uiball/loaders";
import MailExpired from "../components/Home/MailExpired";
import { useMails } from "../context";
import Dashboard from "../components/Home/Dashboard";

export function Home() {
  const { mailsExpired, loadMailsExpired } = useMails();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMailsExpired();
    }, 500)
    return () => clearTimeout(timer);
  }, []);

  function renderlista() {
    if (!mailsExpired) {
      return (
        <div className="row col-md-6 p-4 justify-content-center mx-auto">
          <Orbit size={32} speed={1.5} color="#567bff" />
        </div>
      );
    } else {
      return <MailExpired mailsExpired={mailsExpired} />;
    }
  }
  return (
    <div className="container-fluid pt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Bienvenido...</h1>
          <Tabs
            defaultActiveKey="listaUsers"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="listaUsers" title="Dashboard">
              <Dashboard/>
            </Tab>
            <Tab eventKey="mailexpired" title="Correos Expirados">
              <article>{renderlista()}</article>
            </Tab>

            <Tab eventKey="administracion" title="Administracion"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Home;
