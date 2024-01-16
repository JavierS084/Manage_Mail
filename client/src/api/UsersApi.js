import axios from 'axios';


export const getAllUsers = async () =>
    await axios.get('http://localhost:3030/v1/api/managemail/users');


export const getUser = async (id) =>
    await axios.get(`http://localhost:3030/v1/api/managemail/user/${id}`);


export const sendEmail = async (recipient_email) =>
    await axios.post('http://localhost:3030/v1/api/managemail/send_recovery_email', {recipient_email});


export const createUser = async (user) =>
    await axios.post('http://localhost:3030/v1/api/managemail/user/create', user);

export const updateUser = async (id, newFields) =>
    await axios.put(`http://localhost:3030/v1/api/managemail/user/update/${id}`, newFields);


export const resetPasswordUser = async (id, newFields) =>
    await axios.put(`http://localhost:3030/v1/api/managemail/user/reset-password/${id}`, newFields);



export const deleteUser = async (id) =>
    await axios.delete(`http://localhost:3030/v1/api/managemail/user/delete/${id}`);