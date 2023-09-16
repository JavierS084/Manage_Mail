import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { useDependencies } from "../../context/DependenciesContext";

function DependenciesForm() {
  const { crDp, upDp, getDp } = useDependencies();
  const params = useParams();
 

  const [dependency, setDependency] = useState({
    dependencia: "",
  });

  useEffect(() => {
    const loadDependencies = async () => {
      if (params && params.id) {
        const dependency = await getDp(params.id);
        setDependency({
          dependencia: dependency.dependencia,
        });
      }
    };
    loadDependencies();
  }, []);

  const clearInput = () => {
    const timer = setTimeout(() => {
      setDependency([]);
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <div className="card">
      <Formik
        initialValues={dependency}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.dependencia) {
            errores.dependencia = "Por favor ingrese una dependencia";
          } else if (
            !/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.dependencia)
          ) {
            errores.dependencia = "Por favor ingrese un Dependencia Valida";
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-md-6 p-4">

                <h2>Crear una Nueva Dependencia</h2>
                <fieldset>
                  <label className="form-label mt-4" id="readOnlyInput">
                    Nueva dependencia
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Inserte aqui la nueva dependencia..."
                    data-listener-added_8ef6daa8="true"
                    name="dependencia"
                    onChange={handleChange}
                    value={values.dependencia}
                    onBlur={handleBlur}
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

export default DependenciesForm;
