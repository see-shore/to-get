import axios from 'axios';

export const getStagedItems = async () => {
  const response = await axios.get('/staged-item/all');
  return response.data;
};
