import { createContext, useContext, useState } from "react";
import {
  getAllTypes,
  deleteType,
  createType,
  getmailType,
  updateType,
} from "../api/typesApi";

const MailTypeContext = createContext();

export const useMailTypes = () => {
  const context = useContext(MailTypeContext);
  if (context === undefined) {
    throw new Error("useType must be used within a TypeContextProvider");
  }
  return context;
};

export const MailTypeProvider = ({ children }) => {
  const [mailTypes, setMailTypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgError, setMsgError] = useState("");

  async function loadTypes() {
    const response = await getAllTypes();
    setMailTypes(response.data);
  }

  const getType = async (id) => {
    try {
      const response = await getmailType(id);
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
    <MailTypeContext.Provider
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
    </MailTypeContext.Provider>
  );
};
export default MailTypeProvider;
