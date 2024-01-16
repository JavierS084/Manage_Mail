
import axios from "axios";

export const getAllMails = async () =>
    await axios.get('http://localhost:3030/v1/api/managemail/mails');

export const getAllMailsExpired = async () =>
    await axios.get('http://localhost:3030/v1/api/managemail/mails/expired');
    /*
export const getMailUser = async () =>
    await axios.get('http://localhost:3030/v1/api/managemail/mailUser');
*/

export const getMailDetail = async (id) =>
    await axios.get(`http://localhost:3030/v1/api/managemail/mail/detail/${id}`);


export const createMail = async (mail) =>
    await axios.post('http://localhost:3030/v1/api/managemail/mail/create', mail);

export const updateMail = async (id, newFields) =>
    await axios.put(`http://localhost:3030/v1/api/managemail/mail/update/${id}`, newFields);


export const deleteMail = async (id) =>
    await axios.delete(`http://localhost:3030/v1/api/managemail/mail/delete/${id}`);

