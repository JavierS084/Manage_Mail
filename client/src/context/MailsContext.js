
import { useContext, createContext, useState } from "react";
import { getAllMails, getMailUser, getMail, createMail, updateMail, deleteMail } from "../api/mailsApi";

const contextMail = createContext();


export const useMails = () => {
    const context = useContext(contextMail);
    if (context === undefined) {
        throw new Error("El Context is undefined");
    }
    return context;
}

export const MailProvider = ({ children }) => {
    const [mails, setMails] = useState([]);
    const [ gp, setGp ] = useState(false);
    const [msg, setMsg] = useState("");

    async function loadMails() {
        const response = await getAllMails();
        setMails(response.data);
       
    }

    async function loadMailUser(){
        const response = await getMailUser();
        setMails(response.data);
    }

    const gtMail = async (id) => {
        try {
            const response = await getMail(id);
            return response.data;
        } catch (error) {
            console.error(error);

        }
        
    }   
     

    const crMail = async (mail) => {
        try {
            const response = await createMail(mail);
            setMsg(response.data.msg)
            if(response.status === 201){
                
                setGp(true);
            }else{
                setGp(false);
            }
        } catch (error) {
            console.error(error);
            setMsg(error.response.data.msg);
        }
    }
    const upMail = async (id, newFields) => {
        try {
            const response = await updateMail(id, newFields);
            setMsg(response.data.msg)
            if(response.status === 200){
               
                setGp(true);
            }else{
                setGp(false);
            }
        } catch (error) {
            setMsg(error.response.data.msg);
          
        }
    }

    const delMail = async (id) => {
        try {
            const response = await deleteMail(id);
            setMails(mails.filter(mail => mail.id !== id));
            setMsg(response.data.msg)
            console.log(response);
        } catch (error) {

            console.error(error);
        }
    }


    return (
        <contextMail.Provider value={{ gp, mails, msg, loadMails, loadMailUser, gtMail, crMail, upMail, delMail }} >
            {children}
        </contextMail.Provider>
    )
}

export default MailProvider;