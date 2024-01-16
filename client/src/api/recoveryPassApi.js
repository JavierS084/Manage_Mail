import axios from "axios"

export const createDependency = async (email) =>
    await axios.post('http://localhost:3030/v1/api/managemail/send_recovery_email', email)   
