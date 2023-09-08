import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRequests } from "../../context/RequestsContext";

function RequestsForm() {
  const { crRequest, upRequest, gtRequest } = useRequests();
  const params = useParams();

  const navigate = useNavigate();

  const [request, setRequest] = useState({
    solicitud: "",
  });

  useEffect(() => {
    const loadRequests = async () => {
      if (params && params.id) {
        const request = await gtRequest(params.id);
        setRequest({
          solicitud: request.solicitud,
        });
      }
    };
    loadRequests();
  }, []);

  const clearInput = () => {
    setRequest([]);
  };

  return (
    <div className="card">
      <Formik
        initialValues={request}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.solicitud) {
            errores.solicitud = "Por favor ingrese una solicitud";
          } else if (!/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.solicitud)) {
            errores.solicitud = "Por favor ingrese un solicitud Valida";
          }
          return errores;
        }}
        onSubmit={async (values) => {
          if (params.id) {
            await upRequest(params.id, values);

            navigate("/requests");
          } else {
            await crRequest(values);
          }
          setRequest({
            solicitud: "",
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
                <h2>Crear una nueva solicitud</h2>
                <fieldset>
                  <label className="form-label mt-4" id="readOnlyInput">
                    Nueva solicitud
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Inserte aqui la nueva solicitud..."
                    data-listener-added_8ef6daa8="true"
                    name="solicitud"
                    onChange={handleChange}
                    value={values.solicitud}
                    onBlur={handleBlur}
                  />
                  {touched.solicitud && errors.solicitud && (
                    <span className="error pl-5">{errors.solicitud}</span>
                  )}
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

export default RequestsForm;
