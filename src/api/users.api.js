import axios from 'axios';

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/users/',
})

export const loginUser = async (email, password) => {
  try {
    const response = await usersApi.post('login/', { email, password });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message;
    console.error('Error al hacer login:', errorMessage, error.response?.data);
    throw new Error(errorMessage);
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await usersApi.post('register/', formData);
    return response.data;
  } catch (error) {
    console.error('Error al registrarse:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const getUsers = async () => {
  try {
    const response = await usersApi.get('users/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    console.error('Error al obtener usuarios:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await usersApi.delete(`users/${userId}/`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    console.error('Error al eliminar usuario:', errorMessage);
    throw new Error(errorMessage);
  }
};