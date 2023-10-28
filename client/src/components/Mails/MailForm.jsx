import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Select from "react-select";
import FormSelect from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMails } from "../../context/MailsContext";
import { useRequests } from "../../context/RequestsContext";
import { useMailTypes } from "../../context/MailTypesContext";
import { useGroups } from "../../context/GroupsContext";
import { useDependencies } from "../../context/DependenciesContext";

function MailForm() {
  const { mails, crMail, } = useMails();

  const { requests, loadRequests } = useRequests();
  const { mailTypes, loadTypes } = useMailTypes();
  const { groups, loadGroups } = useGroups();
  const { dependencies, loadDependencies } = useDependencies();
  //section Options de Select search
  const [user, setUser] = useState("");
  const [state, setState] = useState("");
  const [observation, setObservation] = useState("");

  const [dateSolicitud, setDateSolicitud] = useState();
  const [dateInicial, setDateInicial] = useState();
  const [dateFinal, setDateFinal] = useState();

  const [typeRequestList, setTypeRequestsList] = useState([]);
  const [requestOption, setRequestOption] = useState({ requestId: "" });

  const [mailTypesList, setTypeList] = useState([]);
  const [typeOption, setTypeOption] = useState({ mailTypeId: "" });

  const [groupList, setGroupList] = useState([]);
  const [groupOption, setGroupOption] = useState({ groupId: "" });

  const [dependenciesList, setDependenciesList] = useState([]);
  const [dependenciesOption, setDependenciesOption] = useState({
    dependencyId: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const [mail, setMail] = useState({
    user: "",
    solicitante: "Talento Humano",
    state: "",
    observation: "",
    dateInicial: "",
    dateFinal: "",
    dateSolicitud: "",
    mailTypeId: "",
    groupId: "",
    dependencyId: "",
    requestId: "",
  });

  //efecto para la actualizacion y obtencion de datos para el select de los distintos componentes
  useEffect(() => {
    const timer = setTimeout(() => {
      const requestOptionList = requests.map((typeSolicitud) => ({
        requestId: typeSolicitud.id,
        label: typeSolicitud.solicitud,
      }));
      setTypeRequestsList(requestOptionList);

      const mailTypeOptionsList = mailTypes.map((type) => ({
        mailTypeId: type.id,
        label: type.tipo,
      }));
      setTypeList(mailTypeOptionsList);

      const groupOptionsList = groups.map((grupo) => ({
        groupId: grupo.id,
        label: grupo.description,
      }));
      setGroupList(groupOptionsList);

      const dependenciesOptionsList = dependencies.map((dependency) => ({
        dependencyId: dependency.id,
        label: dependency.dependencia,
      }));
      setDependenciesList(dependenciesOptionsList);
    }, 400);

    loadDependencies();
    loadRequests();
    loadTypes();
    loadGroups();

    return () => clearTimeout(timer);
  }, [requests.length, groups.length, mailTypes.length, dependencies.length]);

  const updateProps = () => {
    setMail({
      ...mail,
      mailTypeId: typeOption.mailTypeId,
      dependencyId: dependenciesOption.dependencyId,
      groupId: groupOption.groupId,
      requestId: requestOption.requestId,
      user: user,
      state: state,
      observation: observation,
      dateFinal: dateFinal,
      dateSolicitud: dateSolicitud,
      dateInicial: dateInicial,
    });
  };

  useEffect(() => {
    updateProps();
  }, [user, dateFinal, dateSolicitud, dateInicial]);

  const clearInput = () => {
    const timer = setTimeout(() => {
      setMail([]);
 
    }, 100);
    return () => clearTimeout(timer);
  };

  return (
    <div className="container">
      <div className="card">
        <Formik
          initialValues={mail}
          enableReinitialize={true}
          validate={(values) => {
            let errores = {};

            if (!values.user) {
              errores.user = "Por favor ingrese el Correo";
            } else if (
              !/^[.a-za-z0-9]+@(?:[a-za-z0-9]+\.)+[a-za-z]+$/.test(values.user)
            ) {
              errores.user = "Por favor ingrese un Correo valido";
            } else {
              mails.map((email) => (
                <span key={email.id}>
                  {email.user === values.user
                    ? (errores.user =
                        "El correo ya está en uso, escriba uno diferente")
                    : ""}
                </span>
              ));
            }

            if (!values.dateSolicitud) {
              errores.dateSolicitud = "Por favor ingrese la Fecha de Solicitud";
            }
            if (!values.dateInicial) {
              errores.dateInicial = "Por favor ingrese la Fecha de Vinculacion";
            } else if (values.dateInicial < values.dateSolicitud) {
              errores.dateInicial =
                "La Fecha de Vinculacion no puede ser anterior a la Fecha de Solicitud";
            } else if (
              values.dateInicial &&
              values.dateInicial > values.dateFinal
            ) {
              errores.dateInicial =
                "La Fecha de Vinculacion no Puede ser Superior a la Fecha de Desvinculacion";
            }

            if (values.dateFinal && values.dateFinal < values.dateInicial) {
              errores.dateFinal =
                "La Fecha de Desvinculacion no puede ser anterior a la Fecha de Vinculacion";
            }
            return errores;
          }}
          onSubmit={async (values, actions) => {
            await crMail(values);
            clearInput();
            setMail({
              user: "",
              solicitante: "",
              dateSolicitud: "",
              dateInicial: "",
              dateFinal: "",
              mailTypeId: "",
              requestId: "",
              observation: "",
              state: "",
              dependencyId: "",
              groupId: "",
            });
          }}
        >
          {({
            handleChange,
            isSubmitting,
            errors,
            touched,
            handleSubmit,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="justify-content-center">
                <div className="form-group p-4">
                  <div className="d-flex flex-row">
                    {params.uuid ? (
                      <div className="col-sm-1 flex-column d-flex">
                        <IconArrowLeft
                          className="mt-1"
                          type="button"
                          onClick={() => navigate(`/mails/`)}
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
                          : "Registrar un nuevo correo"}
                      </h2>
                    </div>
                  </div>

                  <fieldset className="row">
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label className="form-label mt-4" id="readOnlyInput">
                        Correo de usuario <span className="obligatorio">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Inserte aqui el usuario..."
                        name="user"
                        onChange={(option) => {
                          setUser(option.target.value);
                          handleChange;
                        }}
                        value={user}
                        onBlur={handleBlur}
                      />
                      <small className="form-text text-danger">
                        {touched.user && errors.user && (
                          <span>{errors.user}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mt-4"
                      >
                        Estado de Correo <span className="obligatorio">*</span>
                      </label>
                      <FormSelect.Select
                        name="state"
                        onBlur={handleBlur}
                        onChange={(option) => {
                          setState(option.target.value);
                          handleChange;
                        }}
                        value={state}
                        required
                      >
                        <option disabled value="">
                          Seleccione
                        </option>

                        <option value="1">Activo</option>
                        <option value="0">Suspendido</option>
                      </FormSelect.Select>
                      <small className="form-text text-danger">
                        {touched.typeOption && errors.typeOption && (
                          <span>{errors.typeOption}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mt-4"
                      >
                        Tipo de correo <span className="obligatorio">*</span>
                      </label>
                      <Select
                        name="mailTypeId"
                        options={mailTypesList}
                        onChange={(option) => {
                          setTypeOption({
                            ...typeOption,
                            mailTypeId: option.mailTypeId,
                          });
                          handleChange;
                        }}
                        placeholder="Seleccione una opción..."
                        isSearchable
                        required
                      />
                      <small className="form-text text-danger">
                        {touched.typeOption && errors.typeOption && (
                          <span>{errors.typeOption}</span>
                        )}
                      </small>
                    </div>

                    <div className="form-group col-md-6 flex-column d-flex">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label mt-4"
                      >
                        Tipo de Solicitud <span className="obligatorio">*</span>
                      </label>
                      <Select
                        name="requestId"
                        options={typeRequestList}
                        onBlur={handleBlur}
                        onChange={(option) => {
                          setRequestOption({
                            ...requestOption,
                            requestId: option.requestId,
                          });
                          handleChange;
                        }}
                        placeholder="Seleccione una opción..."
                        isSearchable
                        required
                      />
                      <small className="form-text text-danger">
                        {touched.requestOption && errors.requestOption && (
                          <span>{errors.requestOption}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label mt-4"
                      >
                        Dependencia Perteneciente
                        <span className="obligatorio">*</span>
                      </label>
                      <Select
                        name="dependecyId"
                        options={dependenciesList}
                        onBlur={handleBlur}
                        onChange={(option) => {
                          setDependenciesOption({
                            ...dependenciesOption,
                            dependencyId: option.dependencyId,
                          });
                          handleChange;
                        }}
                        placeholder="Seleccione una opción..."
                        isSearchable
                        required
                      />
                      {touched.dependenciesOption &&
                        errors.dependenciesOption && (
                          <span>{errors.dependenciesOption}</span>
                        )}
                    </div>

                    <div className="form-group col-md-6 flex-column d-flex">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label mt-4"
                      >
                        Grupo
                      </label>

                      <Select
                        name="groupId"
                        options={groupList}
                        onBlur={handleBlur}
                        onChange={(option) => {
                          setGroupOption({
                            ...groupOption,
                            groupId: option.groupId,
                          });
                        }}
                        placeholder="Seleccione una opción..."
                        isSearchable
                      />
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label className="form-label mt-4">
                        Fecha de Solicitud{" "}
                        <span className="obligatorio">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateSolicitud"
                        onChange={(option) => {
                          setDateSolicitud(option.target.value);
                          handleChange;
                        }}
                        value={dateSolicitud}
                        required
                      />
                      <small className="form-text text-danger">
                        {touched.dateSolicitud && errors.dateSolicitud && (
                          <span>{errors.dateSolicitud}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label className="form-label mt-4">
                        Fecha de Vinculacion
                        <span className="obligatorio">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateInicial"
                        onChange={(option) => {
                          setDateInicial(option.target.value);
                          handleChange;
                        }}
                        value={dateInicial}
                        required
                      />
                      <small className="form-text text-danger">
                        {touched.dateInicial && errors.dateInicial && (
                          <span>{errors.dateInicial}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label className="form-label mt-4">
                        Fecha de Desvinculacion
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="dateFinal"
                        onChange={(option) => {
                          setDateFinal(option.target.value);
                          handleChange;
                        }}
                        value={dateFinal}
                        onBlur={handleBlur}
                      />
                      <small className="form-text text-danger">
                        {touched.dateFinal && errors.dateFinal && (
                          <span>{errors.dateFinal}</span>
                        )}
                      </small>
                    </div>
                    <div className="form-group col-md-6 flex-column d-flex">
                      <label className="form-label mt-4">Observación</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Inserte su observacion..."
                        name="observation"
                        onChange={(option) => {
                          setObservation(option.target.value);
                          handleChange;
                        }}
                        value={observation}
                        onBlur={handleBlur}
                      />
                      <small className="form-text text-danger"></small>
                    </div>
                  </fieldset>

                  <div className="mt-4">
                    <button
                      className="btn btn-success"
                      type="submit"
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onClick={updateProps}
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
    </div>
  );
}

export default MailForm;
