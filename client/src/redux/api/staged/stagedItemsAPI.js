import axios from 'axios';

export const getStagedItems = async () => {
  const response = await axios.get('/staged-item/all');
  return response.data;
};

export const addStagedItem = async (itemData) => {
  const response = await axios.post('/staged-item/new', itemData);
  return response.data;
};

export const updateStagedItem = async (itemData) => {
  const response = await axios.put(`/staged-item?itemId=${itemData.id}`, itemData);
  return response.data;
};

export const deleteStagedItem = async (itemId) => {
  const response = await axios.delete(`/staged-item?itemId=${itemId}`);
  return response.status;
};
