import axios from 'axios';

export const getStagedVendors = async () => {
  const response = await axios.get('/staged-vendor/all');
  return response.data;
};
