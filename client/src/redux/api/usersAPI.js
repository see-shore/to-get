import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('/user/all');
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post('/user/new', userData);
  return response.data;
};
