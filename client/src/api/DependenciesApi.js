import axios from 'axios';

export const getAllDependencies = async () => 
    await axios.get('http://localhost:3030/v1/api/managemail/dependencies');

export const getDependency = async (id) =>
    await axios.get(`http://localhost:3030/v1/api/managemail/dependency/${id}`);

export const createDependency = async (dependency) =>
    await axios.post('http://localhost:3030/v1/api/managemail/dependency/create', dependency)        


    export const updateDependency = async (id, newFields) => 
    await axios.put(`http://localhost:3030/v1/api/managemail/dependency/update/${id}`, newFields);


export const deleteDependency = async (ids) => 
    await axios.delete(`http://localhost:3030/v1/api/managemail/dependency/delete/${ids}`);