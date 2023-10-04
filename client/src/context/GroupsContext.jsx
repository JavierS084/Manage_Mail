import { useContext, useState, createContext } from "react";
import {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../api/groupsApi";

const contextGroups = createContext();

export const useGroups = () => {
  const context = useContext(contextGroups);
  if (context === undefined) {
    throw new Error("El Context is undefined");
  }
  return context;
};

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgError, setMsgError] = useState("");

  async function loadGroups() {
    const response = await getAllGroups();
    setGroups(response.data);
  }

  const gtGroup = async (id) => {
    try {
      const response = await getGroup(id);
      setMsg(response.data.msg);
      return response.data;
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const crGroup = async (group) => {
    try {
      const response = await createGroup(group);
      if (response.status === 201) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };
  const upGroup = async (id, newFields) => {
    try {
      const response = await updateGroup(id, newFields);
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  const delGroup = async (id) => {
    try {
      const response = await deleteGroup(id);
      setGroups(groups.filter((group) => group.id !== id));
      if (response.status === 200) {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
    }
  };

  return (
    <contextGroups.Provider
      value={{
        msg,
        groups,
        loadGroups,
        gtGroup,
        crGroup,
        upGroup,
        delGroup,
        setGroups,
        msgError,
      }}
    >
      {children}
    </contextGroups.Provider>
  );
};

export default GroupsProvider;
