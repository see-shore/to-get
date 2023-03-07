import axios from 'axios';

export const getStagedVendors = async () => {
  const response = await axios.get('/staged-vendor/all');
  return response.data;
};

export const addStagedVendor = async (vendorData) => {
  const response = await axios.post('/staged-vendor/new', vendorData);
  return response.data;
};

export const deleteStagedVendor = async (vendorId) => {
  const response = await axios.delete(`/staged-vendor?vendorId=${vendorId}`);
  return response.status;
};

export const updateStagedVendor = async (vendorData) => {
  const response = await axios.put(`/staged-vendor?vendorId=${vendorData.id}`, vendorData);
  return response.data;
};
