import { useContext, createContext, useState } from "react";
import {
  getAllMails,
  getMailDetail,
  createMail,
  updateMail,
  deleteMail,
  getAllMailsExpired,
} from "../api/mailsApi";

const contextMail = createContext();

export const useMails = () => {
  const context = useContext(contextMail);
  if (context === undefined) {
    throw new Error("El Context is undefined");
  }
  return context;
};

export const MailsProvider = ({ children }) => {
  const [mails, setMails] = useState([]);
  const [mailsExpired, setMailsExpired] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [msg, setMsg] = useState("");

  async function loadMails() {
    const response = await getAllMails();
    setMails(response.data);
    setMsg("");
  }

  async function loadMailsExpired() {
    const response = await getAllMailsExpired();
    setMailsExpired(response.data.data);
    setMsg("");
  }
  /*
  async function loadMailUser() {
    const response = await getMailUser();
    setMails(response.data.data);
  }*/
  const gtMailDetail = async (id) => {
    try {
      const response = await getMailDetail(id);
      setMsg(response.data.msg);
      setMsgError("");
      return response.data.data;
    } catch (error) {
      setMsgError(error.response.data.msg);
      setMsg("");
  
    }
  };

  const crMail = async (mail) => {
    try {
      const response = await createMail(mail);
      if (response.status === 201) {
        setMsg(response.data.msg);
        setMsgError("");
      }
    } catch (error) {
      //console.error(error);
      setMsgError(error.response.data.msg);
      setMsg("");
    }
  };
  const upMail = async (id, newFields) => {
    try {
      const response = await updateMail(id, newFields);

      if (response.status === 200) {
        setMsg(response.data.msg);
        setMsgError("");
      }
    } catch (error) {
      setMsgError(error.response.data.msg);
      setMsg("");
    }
  };

  const delMail = async (id) => {
    try {
      const response = await deleteMail(id);
      setMails(mails.filter((mail) => mail.id !== id));
      setMsg(response.data.msg);
      setMsgError("");
      //console.log(response);
    } catch (error) {
      setMsgError(error.response.data.msg);
      setMsg("");
    }
  };

  return (
    <contextMail.Provider
      value={{
        mails,
        msg,
        loadMails,
        /* loadMailUser,*/
        gtMailDetail,
        crMail,
        upMail,
        delMail,
        loadMailsExpired,
        mailsExpired,
        msgError,
      }}
    >
      {children}
    </contextMail.Provider>
  );
};

export default MailsProvider;
