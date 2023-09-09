
import { createContext, useContext, useState } from "react";
import { getAllRequests, getRequest, createRequest, updateRequest, deleteRequest } from "../api/requestsApi";

const contextRequest = createContext();

export const useRequests = () => {
    const context = useContext(contextRequest);
    if (context === undefined) {
        throw new Error("El Context is undefined");
    }
    return context;
}

export const RequestsProvider = ({ children }) => {

    const [requests, setRequests] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadRequests() {
        const response = await getAllRequests();
        setRequests(response.data);

    }

    const gtRequest = async (id) => {
        try {
            const response = await getRequest(id);
            setMsg(response.data.msg)
            return response.data;
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const crRequest = async (request) => {
        try {
            const response = await createRequest(request);
            setMsg(response.data.msg)
            
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    const upRequest = async (id, newFields) => {
        try {
            const response = await updateRequest(id, newFields);
            setMsg(response.data.msg)
            
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

    const delRequest = async (id) => {
        try {
            const response = await deleteRequest(id);
            setRequests(requests.filter(request => request.id !== id));
            setMsg(response.data.msg)
            
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }


    return (
        <contextRequest.Provider value={{ msg, requests, loadRequests, gtRequest, crRequest, upRequest, delRequest }} >
            {children}
        </contextRequest.Provider>
    )
}

export default RequestsProvider;