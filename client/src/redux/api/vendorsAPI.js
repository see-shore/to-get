import axios from 'axios';

export const getVendors = async () => {
  const response = await axios.get('/vendor/all');
  return response.data;
};
