import { useState, createContext, useContext } from "react";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  sendEmail, 
  resetPasswordUser,
} from "../api/UsersApi";

const contextAdministrations = createContext();
// esto es un hook
export const useAdministrations = () => {
  const context = useContext(contextAdministrations);
  if (context === undefined) {
    throw new Error("useAdministration must be used within a Provider");
  }
  return context;
};

export const AdministrationsProvider = ({ children }) => {
  const [administrations, setAdministrations] = useState([]);
  
  const [msg, setMsg] = useState(""); 
  const [msgError, setMsgError] = useState("");


  async function loadUsers() {
    const response = await getAllUsers();
    setAdministrations(response.data);
  }

  const gtUser = async (id) => {
    try {
      const response = await getUser(id);
      setMsg(response.data.msg);
      return response.data;
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const crUser = async (user) => {
    try {
      const response = await createUser(user);
      if (response.status === 201) {
        setMsg(response.data.msg);
      }
      //console.error(response.data)
    } catch (error) {
      setMsgError(error.response.data.msg);
    //  console.error(error.response.data)
    }
  };

  const sendEmailRecovery = async(recipent_email) => {
    try {
      const response = await sendEmail(recipent_email);
      if (response.status === 210) {
        setMsg(response.data.msg);
      }
      console.log(response)
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  }

  const upUser = async (id, newFields) => {
    try {
      const response = await updateUser(id, newFields);
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const resetPassword = async (id, newFields) => {
    try {
      const response = await resetPasswordUser(id, newFields);
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const delUser = async (id) => {
    try {
      const response = await deleteUser(id);
      setAdministrations(administrations.filter((user) => user.id !== id));
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };
  return (
    <contextAdministrations.Provider
      value={{
        administrations,
        loadUsers,
        gtUser,
        crUser,
        upUser,
        delUser,
        msg,
        setMsg,
        msgError,
        sendEmailRecovery,
        resetPassword,
      }}
    >
      {children}
    </contextAdministrations.Provider>
  );
};
export default AdministrationsProvider;
