import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {useNavigate, useParams } from "react-router-dom";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { useDependencies } from "../../context/DependenciesContext";

export function DependenciesForm() {
  const { crDp, upDp, getDp } = useDependencies();
  const navigate = useNavigate();
  const params = useParams();

  const [dependency, setDependency] = useState({
    dependencia: "",
  });

  useEffect(() => {
    const load_Dependencies = async () => {
      if (params && params.id) {
        const dependency = await getDp(params.id);
        setDependency({
          dependencia: dependency.dependencia,
        });
      }
    };
    load_Dependencies();
  }, [params, getDp]);

  const clearInput = (resetForm) => {
    const timer = setTimeout(() => {
      setDependency({ dependencia: "" });
      resetForm();
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <div className="card">
      <Formik
        initialValues={dependency}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};
          if (values) {
            if (!values.dependencia) {
              errores.dependencia = "Por favor ingrese una dependencia";
            } else if (!/^.{1}[\w\s][^\d]+$/.test(values.dependencia)) {
              errores.dependencia = "Por favor ingrese una Dependencia Valida";
            }
          }

          return errores;
        }}
        onSubmit={async (values) => {
          if (params.id) {
            await upDp(params.id, values);
          } else {
            await crDp(values);
          }

          setDependency({
            dependencia: "",
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
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-md-6 p-4">
                {params.id ? (
                  <p>
                    <button onClick={() => navigate("/dependencies")} className="btn btn-close-white">
                      <IconArrowBackUpDouble size={24} /> Volver
                    </button>
                    <h2 className="row justify-content-center">
                      Editar Dependencia
                    </h2>
                  </p>
                ) : (
                  <h2>Crear Nueva Dependencia</h2>
                )}

                <fieldset>
                  <label className="form-label mt-4" id="readOnlyInput"></label>
                  <input
                    type="text"
                    placeholder="Inserte aqui la nueva dependencia..."
                    data-listener-added_8ef6daa8="true"
                    name="dependencia"
                    value={values.dependencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="form-control"
                  />
                  {touched.dependencia && errors.dependencia && (
                    <span className="error pl-5">{errors.dependencia}</span>
                  )}
                </fieldset>

                <div className="mt-4">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => clearInput(resetForm)}
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

export default DependenciesForm;
