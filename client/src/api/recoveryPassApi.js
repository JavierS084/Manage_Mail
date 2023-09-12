import axios from "axios"

export const createDependency = async (email) =>
    await axios.post('http://localhost:3030/send_recovery_email', email)   
