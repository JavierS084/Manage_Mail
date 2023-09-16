import React, { useState } from "react";
import axios from "axios";
//import { useAdministrations } from "../../context/AdministrationsContext";
import { useNavigate } from "react-router-dom";

export function OtpInputPage({email, otp}) {

  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  console.log(email);
  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:3030/send_recovery_password", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);
  return (
    <div className="container mx-auto row col-3 mt-4 pt-4">
      <div className="card ">
        <div className="card-body mx-auto">
          <div className="d-flex justify-content-center">
            <h3>Verificación de correo</h3>
          </div>
          <div className="d-flex justify-content-center">
            <p>Hemos enviado un código a tu correo electrónico {email} </p>
          </div>

          <div>
            <form>
              <div className="d-flex flex-row col-9">
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="number"
                    onChange={(e) =>
                      setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  />
                </div>
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="number"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  />
                </div>

                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="number"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                      ])
                    }
                  />
                </div>

                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="number"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                      ])
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <div className="form-group col-5col-sm-2pt-2 flex-column d-flex">
                  <button
                    type="submit"
                    onClick={() => verfiyOTP()}
                    className="btn btn-primary"
                  >
                    Verificar Cuenta
                  </button>
                </div>

                <div className="flex flex-column p-2">
                  <p>¿No recibiste el código?</p>{" "}
                  <div className="flex-row">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/")}
                      type="submit"
                    >
                      {"<< Volver atras"}
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => resendOTP()}
                    >
                      {disable
                        ? `Reenviar OTP en ${timerCount}s`
                        : "Reenviar OTP"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpInputPage;
