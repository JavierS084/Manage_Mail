
import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";

function Search() {
  const { dependencies, loadDependencies } = useDependencies();

  useEffect(() => {
    loadDependencies();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = dependencies.filter((dependency) => {
      return dependency.dependencia
        .toLowerCase()
        .includes(searchWord.toLowerCase());
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
                <th scope="col">Dependencias</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, 15).map((dependency) => {
                return (
                  <tr scope="row" key={dependency.id}>
                    <td>{dependency.id} </td>
                    <td>{dependency.dependencia} </td>
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

export default Search;
