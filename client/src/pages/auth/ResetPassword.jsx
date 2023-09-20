import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {  useParams, useNavigate } from "react-router-dom";
import { useAdministrations } from "../../context/AdministrationsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ResetPasswordPage() {
  const { resetPassword, msg, msgError, setMsg } = useAdministrations();
  const params = useParams();
  const navigate = useNavigate();

  const [administration, setAdministration] = useState({
    password: "",
    confPassword: "",
  });

  useEffect(() => {

    if (msg) {
      toast.success(msg);
      setMsg("")
      
    } else if (msgError) {
      toast.error(msgError);
    }
    const timer = setTimeout(() => {
     
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);


  const clearInput = () => {
    const timer = setTimeout(() => {
      setAdministration([]);
    }, 200);


    const timer2 = setTimeout(() => {
      navigate("/")
    }, 1000);
    return () => clearTimeout(timer, timer2);
  };

  return (
    <div className="card">
      <Formik
        initialValues={administration}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.password) {
            errores.password = "Por favor ingrese la contraseña";
          } else if (values.confPassword !== values.password) {
            errores.confPassword = "Las contraseñas no coinciden";
          }

          return errores;
        }}
        onSubmit={async (values) => {
          if (params.uuid) {
            await resetPassword(params.uuid, values);
            console.log(values);
          }
          setAdministration({
            password: "",
            confPassword: "",
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
            <ToastContainer />
              <div className="form-group col-md-4 p-4">
                <div className="d-flex flex-row">
                  <div className="flex-column  d-flex">
                    <h2>Cambiar contraseña</h2>
                  </div>
                </div>

                <fieldset>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.password && errors.password && (
                        <span>{errors.password}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="form-label mt-4"
                    >
                      Confirmacion de Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Password"
                      name="confPassword"
                      onChange={handleChange}
                      value={values.confPassword}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.confPassword && errors.confPassword && (
                        <span>{errors.confPassword}</span>
                      )}
                    </small>
                  </div>
                </fieldset>

                <div className="mt-4">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={clearInput}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar y Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPasswordPage;
