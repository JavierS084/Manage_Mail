import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { useGroups } from "../../context/GroupsContext";

export function GroupForm() {
  const { crGroup, gtGroup, upGroup } = useGroups();
  const [group, setGroup] = useState({
    email: "",
    description: "",
    dateInicialG: "",
    dateFinalG: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadGroup = async () => {
        if (params.id) {
          const group = await gtGroup(params.id);
          setGroup({
            email: group.email,
            description: group.description,
            dateInicialG: group.dateInicialG,
            dateFinalG: group.dateFinalG,
          });
        }
      };
      loadGroup();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const clearInput = () => {
    const timer = setTimeout(() => {
      setGroup([]);
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <div className="card">
      <Formik
        initialValues={group}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.email) {
            errores.email = "Por favor ingrese el Correo";
          } else if (
            !/^[.a-za-z0-9]+@(?:[a-za-z0-9]+\.)+[a-za-z]+$/.test(values.email)
          ) {
            errores.email = "Por favor ingrese un Correo valido";
          }
          if (!values.description) {
            errores.description = "Por favor ingrese el nombre del Grupo ";
          } else if (!/^.{2}[A-z Á-ź\s]+$/.test(values.description)) {
            errores.description = "Por favor ingrese un Grupo Valido";
          }

          if (!values.dateInicialG) {
            errores.dateInicialG = "Por favor ingrese la Fecha de Vinculacion";
          }
          return errores;
        }}
        onSubmit={async (values) => {
          if (params.id) {
            await upGroup(params.id, values);
          } else {
            await crGroup(values);
          }

          setGroup({
            email: "",
            description: "",
            dateInicialG: "",
            dateFinalG: "",
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-md-6 p-4">

              <div className="d-flex flex-row">
                  {params.id ? (
                    <div className="col-sm-1 flex-column d-flex">
                      <IconArrowLeft
                        className="mt-1"
                        type="button"
                        onClick={() => navigate(`/groups`)}
                        color="grey"
                        size={28}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col-md-8 flex-column  d-flex">
                    <h2>
                      {params.uuid
                        ? "Editar Grupo"
                        : "Crear un nuevo Grupo"}
                    </h2>
                  </div>
                </div>

                <fieldset>
                  <div className="form-group">
                    <label className="form-label mt-4">Correo de Grupo</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      onBlur={handleBlur}
                      placeholder="Ingrese el correo de grupo"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <small className="form-text text-danger">
                      {touched.email && errors.email && (
                        <span>{errors.email}</span>
                      )}
                    </small>
                  </div>

                  <div className="form-group ">
                    <label className="form-label mt-4">Detalle de Grupo</label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      onBlur={handleBlur}
                      placeholder="Ingrese el detalle de grupo"
                      onChange={handleChange}
                      value={values.description}
                    />
                    <small className="form-text text-danger">
                      {touched.description && errors.description && (
                        <span>{errors.description}</span>
                      )}
                    </small>
                  </div>

                  <div className="form-group flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Vinculacion
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateInicialG"
                        onChange={handleChange}
                        value={values.dateInicialG}
                      />
                    </label>
                    <small className="form-text text-danger">
                      {touched.dateInicialG && errors.dateInicialG && (
                        <span>{errors.dateInicialG}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Desvinculacion
                      <input
                        className="form-control"
                        type="date"
                        name="dateFinalG"
                        onChange={handleChange}
                        value={values.dateFinalG}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-success"
                      type="submit"
                      disabled={isSubmitting}
                      onClick={clearInput}
                    >
                      {isSubmitting ? "Guardando..." : "Guardar y Continuar"}
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GroupForm;
