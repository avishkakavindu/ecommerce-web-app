import axios from 'axios';

const API_URL = '/users';

const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post('auth/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (userData) => {
  const response = await axios.get('auth/logout', {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
      'x-refresh': userData?.refreshToken,
    },
  });
  localStorage.removeItem('user');

  return response.data;
};

const authService = {
  registerUser,
  login,
  logout,
};

export default authService;
