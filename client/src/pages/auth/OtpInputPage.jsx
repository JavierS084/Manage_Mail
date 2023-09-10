import React, { useState } from "react";
import axios from "axios";

export function OtpInputPage({ email }) {
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  console.log(email);
  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        /* OTP: otp,
            recipient_email: email,*/
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }
  /*
      function verfiyOTP() {
        if (parseInt(OTPinput.join("")) === otp) {
          setPage("reset");
          return;
        }
        alert(
          "The code you have entered is not correct, try again or re-send the link"
        );
        return;
      }*/

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
    <div className="container col-md-4 mt-4 p-4">
      <div className="card col-md-center">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <h3>Verificación de correo</h3>
          </div>
          <div className="d-flex justify-content-center text-gray-400">
            <p>Hemos enviado un código a tu correo electrónico {email} </p>
          </div>

          <div>
            <form>
              <div className="d-flex flex-row col-md-9">
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) =>
                      setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
              
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
                
                <div className="form-group col-4 p-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                      ])
                    }
                  ></input>
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <div className="form-group col-5col-sm-2pt-2 flex-column d-flex">
                  <button type="submit" className="btn btn-primary">
                    Verificar Cuenta
                  </button>
                </div>

                <div className="flex flex-row p-2">
                  <p>¿No recibiste el código?</p>{" "}
                  <a
                    className="flex flex-row items-center"
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={() => resendOTP()}
                  >
                    {disable ? `Reenviar OTP en ${timerCount}s` : "Reenviar OTP"}
                  </a>
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
