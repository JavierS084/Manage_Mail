import { useState, createContext, useContext } from "react";
import {
  getAllDependencies,
  getDependency,
  createDependency,
  updateDependency,
  deleteDependency,
} from "../api/DependenciesApi";

const contextDependencies = createContext();
// esto es un hook
export const useDependencies = () => {
  const context = useContext(contextDependencies);
  if (context === undefined) {
    throw new Error("useDepencies must be used within a Provider");
  }
  return context;
};

export const DependenciesProvider = ({ children }) => {
  // es el componente

  const [dependencies, setDependencies] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgError, setMsgError] = useState("");

  async function loadDependencies() {
    const response = await getAllDependencies();
    setDependencies(response.data);
    setMsg("")
  }

  const getDp = async (id) => {
    try {
      const response = await getDependency(id);
      setMsg(response.data.msg);
      return response.data;
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const crDp = async (depart) => {
    try {
      const response = await createDependency(depart);
      if (response.status === 201) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
      console.error(error.response.data)
    }
  };
  const upDp = async (id, newFields) => {
    try {
      const response = await updateDependency(id, newFields);
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };
  const delDp = async (id) => {
    try {
      const response = await deleteDependency(id);
      setDependencies(
        dependencies.filter((dependency) => dependency.id !== id)
      );
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  //retorna su contexto a traves el Provider
  return (
    <contextDependencies.Provider
      value={{
        dependencies,
        setDependencies,
        loadDependencies,
        getDp,
        crDp,
        upDp,
        delDp,
        msg,
        msgError,
      }}
    >
      {children}
    </contextDependencies.Provider>
  );
};
export default DependenciesProvider;
