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
  const [gp, setGp] = useState(false);
  const [msg, setMsg] = useState("");

  async function loadMails() {
    const response = await getAllMails();
    setMails(response.data.data);
  }

  async function loadMailsExpired() {
    const response = await getAllMailsExpired();
    setMailsExpired(response.data.data);
  }
  /*
  async function loadMailUser() {
    const response = await getMailUser();
    setMails(response.data.data);
  }*/
  const gtMailDetail = async (id) => {
    try {
      const response = await getMailDetail(id);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const crMail = async (mail) => {
    try {
      const response = await createMail(mail);
      setMsg(response.data.msg);
      if (response.status === 201) {
        setGp(true);
      } else {
        setGp(false);
      }
    } catch (error) {
      console.error(error);
      setMsg(error.response.data.msg);
    }
  };
  const upMail = async (id, newFields) => {
    try {
      const response = await updateMail(id, newFields);
      setMsg(response.data.msg);
      if (response.status === 200) {
        setGp(true);
      } else {
        setGp(false);
      }
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const delMail = async (id) => {
    try {
      const response = await deleteMail(id);
      setMails(mails.filter((mail) => mail.id !== id));
      setMsg(response.data.msg);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <contextMail.Provider
      value={{
        gp,
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
      }}
    >
      {children}
    </contextMail.Provider>
  );
};

export default MailsProvider;
