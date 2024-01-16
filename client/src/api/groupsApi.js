import axios from 'axios';


export const getAllGroups = async () => 
    await axios.get('http://localhost:3030/v1/api/managemail/groups');


export const getGroup = async (id) => 
    await axios.get(`http://localhost:3030/v1/api/managemail/group/${id}`);


export const createGroup = async (group) => 
    await axios.post('http://localhost:3030/v1/api/managemail/group/create', group);

export const updateGroup = async (id, newFields) => 
    await axios.put(`http://localhost:3030/v1/api/managemail/group/update/${id}`, newFields);


export const deleteGroup = async (id) => 
    await axios.delete(`http://localhost:3030/v1/api/managemail/group/delete/${id}`); 