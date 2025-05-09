import axios from 'axios';

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/users/',
})

export const loginUser = async (email, password) => {
    try {
        const response = await usersApi.post('login/', {email, password})
        return response.data
    } catch (error) {
        console.error('Error al hacer login:', error.response ? error.response.data : error.message);
        throw error; 
        
    }
}

