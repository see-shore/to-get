import axios from 'axios';

export const getItems = async () => {
  const response = await axios.get('/item/all');
  return response.data;
};
