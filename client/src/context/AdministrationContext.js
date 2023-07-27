"use client"

import { useState, createContext, useContext } from "react";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../api/UsersApi";

const contextAdministration = createContext();
// esto es un hook
export const useAdministrations = () => {
    const context = useContext(contextAdministration);
    if (context === undefined) {
        throw new Error("useAdministration must be used within a Provider")
    }
    return context;

}

export const AdministrationProvider = ({ children }) => {
    const [administrations, setAdministrations] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadUsers() {

        const response = await getAllUsers();
        setAdministrations(response.data);
        setMsg(response.data.msg)

    }

    const gtUser = async (id) => {
        try {
            const response = await getUser(id);
            setMsg(response.data.msg)
            return response.data;
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const crUser = async (user) => {
        try {
            const response = await createUser(user);
            setMsg(response.data.msg)

        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    const upUser = async (id, newFields) => {
        try {
            const response = await updateUser(id, newFields);
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);

        }
    }

    const delUser = async (id) => {
        try {
            const response = await deleteUser(id);
            setAdministrations(administrations.filter(user => user.id !== id));
            setMsg(response.data.msg)

        } catch (error) {
            setMsg(error.response.data.msg);

        }
    }
    return (
        <contextAdministration.Provider value={{ administrations, loadUsers, gtUser, crUser, upUser, delUser, msg }}>
            {children}
        </contextAdministration.Provider>
    )


}