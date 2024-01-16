import axios from 'axios';

export const getAllTypes = async () => 
    await axios.get('http://localhost:3030/v1/api/managemail/mailtypes');


export const getmailType = async (id) => 
    await axios.get(`http://localhost:3030/v1/api/managemail/mailtype/${id}`);

export const createType = async (type) => 
    await axios.post('http://localhost:3030/v1/api/managemail/mailtype/create', type);


export const updateType = async (id, newFields) => 
    await axios.put(`http://localhost:3030/v1/api/managemail/mailtype/update/${id}`, newFields);


export const deleteType = async (id) => 
    await axios.delete(`http://localhost:3030/v1/api/managemail/mailtype/delete/${id}`);

