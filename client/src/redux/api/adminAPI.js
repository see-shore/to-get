import axios from 'axios';

export const publishToUsers = async () => {
  const response = await axios.post('/admin/publish-to-users');
  return response.status;
};

export const archiveAllPublishedData = async () => {
  const response = await axios.post('/admin/archive-all');
  return response.status;
};
