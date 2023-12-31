import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchProductList = async (accessToken, refreshToken) => {
  try {
    const response = await axios.get('/products/list', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
      },
    });

    // Handle the response data as needed
    console.log('Response Data:', response.data);
    return response?.data;
  } catch (error) {
    // Handle errors
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  }
};

export const fetchProductById = async (
  productId,
  accessToken,
  refreshToken
) => {
  try {
    const response = await axios.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
      },
    });

    // Handle the response data as needed
    console.log('Product Data:', response.data);
    return response?.data;
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    const { message, userMessage } = error?.response?.data?.errors[0];

    if (message && message === 'VALIDATION_ERROR') {
      toast.error('No product found');
    } else {
      toast.error('Something went wrong');
    }
  }
};

export const deleteProductById = async (
  productId,
  accessToken,
  refreshToken
) => {
  try {
    const response = await axios.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
      },
    });

    // Handle the response status code to determine success/failure
    if (response.status === 200) {
      toast.success('Product deleted successfully');
      return true;
    } else {
      toast.error('Failed to delete product');
      return false; // Indicate failure
    }
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    toast.error('Something went wrong while deleting');
    return false; // Indicate failure
  }
};
