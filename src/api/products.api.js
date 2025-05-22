import axios from 'axios';
//Este debe corregirse y falta

const productsApi = axios.create({
  baseURL: 'http://localhost:8000/products/',
});

export const getProducts = async () => {
  try {
    const response = await productsApi.get('');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    console.error('Error al obtener productos:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await productsApi.delete(`${productId}/`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    console.error('Error al eliminar producto:', errorMessage);
    throw new Error(errorMessage);
  }
};