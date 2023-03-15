import axios from 'axios';

export const publishToUsers = async () => {
  const response = await axios.post('/admin/publish-to-users');
  return response.status;
};

export const archiveAllPublishedData = async () => {
  const response = await axios.post('/admin/archive-all');
  return response.status;
};

export const publishDeliveryDate = async (deliveryData) => {
  const response = await axios.post('/delivery', deliveryData);
  return response.data;
};

export const getMostRecentlySetDeliveryDate = async () => {
  const response = await axios.get('/delivery');
  return response.data;
};
