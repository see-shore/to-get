import axios from 'axios';

export const getStagedVendors = async () => {
  const response = await axios.get('/staged-vendor/all');
  return response.data;
};

export const addStagedVendor = async (vendorData) => {
  const response = await axios.post('/staged-vendor/new', vendorData);
  return response.data;
};
