import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('/user/all');
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post('/user/new', userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`/user?userId=${userId}`);
  return response.data;
};

export const getUser = async (email) => {
  const response = await axios.get(`/user?email=${email}`);
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axios.put(`/user?userId=${userData.id}`, userData);
  return response.data;
};

export const getRecentUsers = async (email) => {
  const response = await axios.get(`/user/recent?email=${email}`);
  return response.data
};
