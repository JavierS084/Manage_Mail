"use client"
import { createContext, useContext, useState } from 'react';
import { getAllTypes, deleteType, createType, getmailType, updateType } from '@/api/typesApi';


const MailTypeContext = createContext();

export const useMailTypes = () => {
    const context = useContext(MailTypeContext);
    if (context === undefined) {
        throw new Error("useType must be used within a TypeContextProvider")
    }
    return context;
};

export const MailTypeProvider = ({ children }) => {
    const [mailTypes, setMailTypes] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadTypes() {
        const response = await getAllTypes();
        setMailTypes(response.data);
        setMsg(response.data.msg)
    }

    const getType = async (id) => {
        try {
            const response = await getmailType(id);
            setMsg(response.data.msg)
            return response.data
        } catch (error) {
            setMsg(error.response.data.msg);
        }

    }

    const crType = async (type) => {
        try {
            const response = await createType(type);
            setMsg(response.data.msg)

        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const upType = async (id, newFields) => {
        try {
            const response = await updateType(id, newFields);
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);

        }

    }
    const delType = async (id) => {
        try {
            const response = await deleteType(id);
            setMailTypes(MailTypes.filter(type => type.id !== id));
            setMsg(response.data.msg)
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    };




    return (
        <MailTypeContext.Provider value={{ mailTypes, loadTypes, delType, crType, getType, upType, msg }} >
            {children}
        </MailTypeContext.Provider>
    )


}
export default MailTypeProvider;