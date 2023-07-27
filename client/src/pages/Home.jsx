import  {useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../auth/authSlice";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isError) {
        navigate("/");
      }
      dispatch(getMe());


    }, 100);
    return () => clearTimeout(timer);
  }, [dispatch, isError, navigate]);

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Bienvenido...</h1>
        <Tabs
          defaultActiveKey="listaUsers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="listaUsers" title="Dashboard">
            <div
              className="tab-pane fade active show"
              id="listaUsers"
              role="tabpanel"
            ></div>
          </Tab>
          <Tab eventKey="mailexpired" title="Correos Expirados">
            <article></article>
          </Tab>

          <Tab eventKey="administracion" title="Administracion"></Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Home;