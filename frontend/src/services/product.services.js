import axios from 'axios';

const fetchProductList = async (accessToken, refreshToken) => {
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

export default fetchProductList;
