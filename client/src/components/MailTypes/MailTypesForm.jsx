import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMailTypes } from "../../context/MailTypeContext";

function MailTypesForm() {
  const { crType, upType, getType } = useMailTypes();
  const params = useParams();
  const navigate = useNavigate();

  const [MailType, setMailType] = useState({
    tipo: "",
  });

  useEffect(() => {
    const loadMailTypes = async () => {
      if (params && params.id) {
        const MailType = await getType(params.id);
        setMailType({
          tipo: MailType.tipo,
        });
      }
    };
    loadMailTypes();
  }, []);

  const clearInput = () => {
    const timer = setTimeout(() => {
      setMailType([]);
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <div className="card">
      <Formik
        initialValues={MailType}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.tipo) {
            errores.tipo = "Por favor ingrese una tipo";
          } else if (!/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.tipo)) {
            errores.tipo = "Por favor ingrese un tipo Valida";
          }
          return errores;
        }}
        onSubmit={async (values) => {
          if (params.id) {
            await upType(params.id, values);

            navigate("/dependencies");
          } else {
            await crType(values);
          }
          setMailType({
            tipo: "",
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
                <h2>Crear una nuevo tipo de correo</h2>
                <fieldset>
                  <label className="form-label mt-4" id="readOnlyInput">
                    Nuevo tipo de correo
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Inserte aqui la nueva tipo..."
                    data-listener-added_8ef6daa8="true"
                    name="tipo"
                    onChange={handleChange}
                    value={values.tipo}
                    onBlur={handleBlur}
                  />
                  {touched.tipo && errors.tipo && (
                    <span className="error pl-5">{errors.tipo}</span>
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

export default MailTypesForm;
