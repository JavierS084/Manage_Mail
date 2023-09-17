
import { useState} from "react";
import { Formik, Form } from "formik";

import { useNavigate, } from "react-router-dom";
import { useAdministrations } from "../../context/AdministrationsContext";


function ResetPassword() {
  const { crUser } = useAdministrations();

  const navigate = useNavigate();


  const [administration, setAdministration] = useState({
    password: "",
    confPassword: "",
  });


  const clearInput = () => {
    const timer = setTimeout(() => {
      
      setAdministration([]);
      
    }, 200);
    return () => clearTimeout(timer);
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
          await crUser(values)
          console.log(values)
          
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
              <div className="form-group col-md-6 p-4">
                <div className="d-flex flex-row">
                  
                  <div className="col-md-8 flex-column  d-flex">
                    <h2>
                      Reset passsword
                    </h2>
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

export default ResetPassword;
