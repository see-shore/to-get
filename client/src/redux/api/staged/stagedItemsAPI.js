import axios from 'axios';

export const getStagedItems = async () => {
  const response = await axios.get('/staged-item/all');
  return response.data;
};

export const addStagedItem = async (itemData) => {
  const response = await axios.post('/staged-item/new', itemData);
  return response.data;
};
