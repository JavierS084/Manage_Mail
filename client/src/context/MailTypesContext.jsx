import { createContext, useContext, useState } from "react";
import {
  getAllTypes,
  deleteType,
  createType,
  getmailType,
  updateType,
} from "../api/typesApi";

const MailTypesContext = createContext();

export const useMailTypes = () => {
  const context = useContext(MailTypesContext);
  if (context === undefined) {
    throw new Error("useType must be used within a TypeContextProvider");
  }
  return context;
};

export const MailTypesProvider = ({ children }) => {
  
  const [mailTypes, setMailTypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgError, setMsgError] = useState("");

  async function loadTypes() {
    const response = await getAllTypes();
    setMailTypes(response.data);
    setMsg("")
  }

  const getType = async (id) => {
    try {
      const response = await getmailType(id);
      setMsg(response.data.msg)
      return response.data;
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const crType = async (type) => {
    try {
      const response = await createType(type);
      if (response.status === 201) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const upType = async (id, newFields) => {
    try {
      const response = await updateType(id, newFields);
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };
  const delType = async (id) => {
    try {
      const response = await deleteType(id);
      setMailTypes(mailTypes.filter((type) => type.id !== id));
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  return (
    <MailTypesContext.Provider
      value={{
        mailTypes,
        loadTypes,
        delType,
        crType,
        getType,
        upType,
        msg,
        msgError,
      }}
    >
      {children}
    </MailTypesContext.Provider>
  );
};
export default MailTypesProvider;
