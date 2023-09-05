import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset, getMe } from "../auth/authSlice";
import { IconSquare, IconSquareCheck } from "@tabler/icons-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shown, setShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchShown = () => {
    setShown(!shown);
  };

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/home");
    }
    dispatch(getMe());
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="container col-md-5 mt-4 p-4">
      <div className="card col-md-center">
        <div className="card-body">
          <form onSubmit={Auth}>
            <div className="row mx-auto">
              <h3 className="d-flex justify-content-center">
                Inicio Sesi&oacute;n
              </h3>
              <fieldset className="pt-4">
                <div className="form-group">
                  {isError && <p className="error">{message}</p>}
                  <label className="form-label mt-4">Correo electrónico</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su correo electrónico"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label mt-4">Contraseña</label>
                  <input
                    className="form-control"
                    type={shown ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*******"
                  />
                </div>
                <div className="form-group">
                  {password && shown ? (
                    <p>
                      <label className="form-label mt-4 p-2">
                        Ocultar contraseña: {""}
                      </label>
                      <IconSquareCheck onClick={switchShown} />
                    </p>
                  ) : (
                    <p>
                      <label className="form-label mt-4 m-2">
                        Mostrar contraseña:{" "}
                      </label>
                      <IconSquare onClick={switchShown} />
                    </p>
                  )}
                </div>
                <hr/>
                <div className="mt-4 form-group">
                  <button type="submit" className="btn btn-primary">
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                  </button>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
