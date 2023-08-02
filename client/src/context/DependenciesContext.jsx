
import { useState, createContext, useContext } from "react";
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency } from "../api/DependenciesApi";

const contextDependencies = createContext();
// esto es un hook
export const useDependencies = () => {
    const context = useContext(contextDependencies);
    if (context === undefined) {
        throw new Error("useDepencies must be used within a Provider")
    }
    return context;

}


export const DependenciesProvider = ({ children }) => { // es el componente 

    const [dependencies, setDependencies] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadDependencies() {
        const response = await getAllDependencies();
        setDependencies(response.data);
        setMsg(response.data.msg)
    }

    const getDp = async (id) => {
        try {
            const response = await getDependency(id);
            setMsg(response.data.msg)
            return response.data;
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const crDp = async (depart) => {
        try {
            const response = await createDependency(depart);
            setMsg(response.data.msg)
            
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    const upDp = async (id, newFields) => {
        try {
            const response = await updateDependency(id, newFields);
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);

        }
    }
    const delDp = async (id) => {
        try {
            const response = await deleteDependency(id);
            setDependencies(dependencies.filter(dependency => dependency.id !== id));
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);
        }

    }


    //retorna su contexto a traves el Provider
    return (<contextDependencies.Provider value={{ dependencies, setDependencies, loadDependencies, getDp, crDp, upDp, delDp, msg }}>
        {children}
    </contextDependencies.Provider>
    )
}
export default DependenciesProvider;