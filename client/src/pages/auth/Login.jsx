import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconSquare, IconSquareCheck } from "@tabler/icons-react";
import { Image } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";
import { LoginUser, reset, getMe } from "../../auth/authSlice";
//import { OtpInputPage } from "./OtpInputPage";
import { useAdministrations } from "../../context";
//import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { sendEmailRecovery }= useAdministrations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState();
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
    const timer = setTimeout(() => {
      dispatch(getMe());
      if (user && isSuccess) {
        navigate("/home");
      }
      dispatch(reset());
    }, 500);
    return () => clearTimeout(timer);
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isSuccess && message.length) {
      toast.success(message);
    } else if (isError && message.length) {
      toast.error(message);
    }
  }, [message]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  
  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      sendEmailRecovery(email, OTP)
      navigate("/verification-otp", {email, otp});

    }
  }

  return (
    <div className="container col-md-4 mt-4 p-4">
      <ToastContainer />
      <div className="card col-md-center">
        <div className="card-body">
          <form onSubmit={Auth}>
            <div className="row mx-auto">
              <div className="d-flex justify-content-center pb-4">
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src="https://image.lexica.art/full_jpg/a3400786-d7fd-4196-a3dd-0b34aa8439b3"
                  alt="Manage mail"
                />
              </div>

              <h3 className="d-flex justify-content-center">
                Inicio Sesi&oacute;n
              </h3>
              <fieldset className="pt-4">
                <div className="form-group">
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
                      <IconSquareCheck onClick={switchShown} />
                      <label className="form-label mt-4 p-2">
                        Ocultar contraseña
                      </label>
                    </p>
                  ) : (
                    <p>
                      <IconSquare onClick={switchShown} />
                      <label className="form-label mt-4 p-2">
                        Mostrar contraseña
                      </label>
                    </p>
                  )}
                </div>
                <hr />
                <div className="d-flex p-2 justify-content-end">
                  <a onClick={navigateToOtp}>
                    ¿Olvidaste tu contraseña?{" "}
                  </a>
                </div>
                <div className="form-group pt-2 flex-column d-flex">
                  <button type="submit" className="btn btn-primary">
                    {isLoading ? (
                      <Orbit size={25} speed={1.5} color="white" />
                    ) : (
                      "Iniciar Sesión"
                    )}
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
