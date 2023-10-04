
import { useEffect, useState } from "react";
import { useMails } from "../../context/MailsContext";

export function MailSearch() {
  const { mails, loadMails } = useMails();

  useEffect(() => {
    loadMails();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = mails.filter((mail) => {
      return mail.user.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const showError = filteredData.length === 0;
  const showSearch = filteredData.length !== 0;

  return (
    <div className="card">
      <form className="d-flex col-md-10 mx-auto p-4">
        <input
          className="form-control"
          type="text"
          autoFocus={true}
          placeholder="Search..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </form>
      <div className="card-body">
        <h4>Resultado</h4>
        <hr />
        {filteredData.length !== 0 && (
          <table
            className="table table-hover mt-2"
            style={{ display: showSearch ? "" : "none" }}
          >
            <thead>
              <tr className="border-bottom">
                <th scope="col">ID</th>
                <th scope="col">Correo</th>
                <th scope="col">Dependencias</th>
                <th className="col">Grupo</th>
                <th className="col">Tipo de Correo</th>
                <th className="col">Inicio</th>
                <th className="col">Fin</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, 15).map((mail) => {
                return (
                  <tr scope="row" key={mail.id}>
                    <td>{mail.id} </td>
                    <td>{mail.user} </td>
                    <td>{mail.dependency.dependencia}</td>
                    {mail.group ? (
                      <td className="ml-2 text-center">
                        {mail.group.description}
                      </td>
                    ) : (
                      <td>Sin Grupo</td>
                    )}
                    <td>{mail.mailType.tipo}</td>
                    <td>{mail.dateInicial}</td>
                    <td>{mail.dateFinal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {wordEntered === "" ? (
          <div className="alert alert-success animate_animated">
            Escriba la dependencia que esta buscando...
          </div>
        ) : (
          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No existe dicha Dependencia: <b>{wordEntered}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default MailSearch;