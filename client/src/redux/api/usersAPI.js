import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('/user/all');
  return response.data;
};
