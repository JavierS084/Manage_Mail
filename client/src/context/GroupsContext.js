
"use client"
import React, { useContext, useState, createContext } from "react";
import { getAllGroups, getGroup, createGroup, updateGroup, deleteGroup } from "@/api/groupsApi";

const contextGroup = createContext();

export const useGroups = () => {
    const context = useContext(contextGroup);
    if (context === undefined) {
        throw new Error("El Context is undefined");
    }
    return context;
}

export const GroupProvider = ({ children }) => {

    const [groups, setGroups] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadGroups() {
        const response = await getAllGroups();
        setGroups(response.data);
        setMsg(response.data.msg)

    }

    const gtGroup = async (id) => {
        try {
            const response = await getGroup(id);
            setMsg(response.data.msg)
            return response.data;
        } catch (error) {
            setMsg(error.response.data.msg);

        }
    }

    const crGroup = async (group) => {
        try {
            const response = await createGroup(group);
            setMsg(response.data.msg)
            console.log(response);
        } catch (error) {
            setMsg(error.response.data.msg);
            console.error(error);

        }
    }
    const upGroup = async (id, newFields) => {
        try {
            const response = await updateGroup(id, newFields);
            console.log(response);
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);
            console.error(error);
        }
    }

    const delGroup = async (id) => {
        try {
            const response = await deleteGroup(id);
            setGroups(groups.filter(group => group.id !== id));
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }


    return (
        <contextGroup.Provider value={{ msg, groups, loadGroups, gtGroup, crGroup, upGroup, delGroup }} >
            {children}
        </contextGroup.Provider>
    )
}

export default GroupProvider;