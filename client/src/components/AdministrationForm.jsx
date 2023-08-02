/*
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import FormSelect from "react-bootstrap/Form";
import { useRouter, useParams } from "next/navigation";
import { useAdministrations } from "@/context/AdministrationContext";
import { IconArrowLeft } from "@tabler/icons-react";

function AdministrationForm() {
  const { administrations, crUser, upUser, gtUser, msg } = useAdministrations();
  const params = useParams();
  const router = useRouter();
  const [administration, setAdministration] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    confPassword: "",
  });
  useEffect(() => {
    const loadAdministration = async () => {
      if (params && params.uuid) {
        const administration = await gtUser(params.uuid);
        setAdministration({
          name: administration.name,
          role: administration.role,
          email: administration.email,
          password: administration.password,
          confPassword: administration.confPassword,
        });
      }
    };
    loadAdministration();
  }, []);

  const clearInput = () => {
    setAdministration([]);
  };

  return (
    <div className="card">
      <Formik
        initialValues={administration}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.name) {
            errores.name = "Por favor ingrese el nombre completo";
          } else if (!/^.{2}[A-z Á-ź\D\s\s]+$/.test(values.name)) {
            errores.name = "Por favor ingrese un Nombre Valido";
          }
          if (!values.email) {
            errores.email = "Por favor ingrese el Correo";
          } else if (
            !/^[.a-za-z0-9]+@(?:[a-za-z0-9]+\.)+[a-za-z]+$/.test(values.email)
          ) {
            errores.email = "Por favor ingrese un Correo valido";
          } else {
            administrations.map((mail) => (
              <span key={mail.id}>
                {mail.email === values.email
                  ? (errores.email =
                      "El correo ya está en uso, escriba uno diferente")
                  : ""}
              </span>
            ));
          }
          if (!values.password) {
            errores.password = "Por favor ingrese la contraseña";
          } else if (values.confPassword !== values.password) {
            errores.confPassword = "Las contraseñas no coinciden";
          }

          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.uuid) {
            await upUser(params.uuid, values);
            toast.success(
              "El usuario " + values.name + " se ha actualizado correctamente"
            );
            router.push("/administration");
          } else {
            await crUser(values);
            toast.success(
              "El usuario " + values.name + " se ha guardado correctamente"
            );
          }
          setAdministration({
            name: "",
            role: "",
            email: "",
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
                  {params.uuid ? (
                    <div className="col-sm-1 flex-column d-flex">
                      <IconArrowLeft
                        className="mt-1"
                        type="button"
                        onClick={() => router.push(`/administration/`)}
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
                        ? "Editar Usuario"
                        : "Crear un nuevo Usuario"}
                    </h2>
                  </div>
                </div>
                <p className="error pl-5">{msg}</p>

                <fieldset>
                  <div className="form-group">
                    <label className="form-label mt-4" id="readOnlyInput">
                      Nombre Completo
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inserte aqui el nombre..."
                      data-listener-added_8ef6daa8="true"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.name && errors.name && (
                        <span>{errors.name}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                      Dirección de correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Ingrese su correo"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    <small id="emailHelp" className="form-text text-danger">
                      {touched.email && errors.email && (
                        <span>
                          <b>{errors.email}</b>
                        </span>
                      )}
                    </small>
                  </div>
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
                <fieldset className="form-group">
                  <legend className="mt-4">Tipo de Usuario</legend>

                  <FormSelect.Select
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                  >
                    <option disabled value="">
                      Seleccione
                    </option>

                    <option value="user">Usuario estandar</option>
                    <option value="admin">Administrador</option>
                  </FormSelect.Select>
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

export default AdministrationForm;
*/