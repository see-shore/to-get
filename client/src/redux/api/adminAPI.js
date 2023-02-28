import axios from 'axios';

export const publishToUsers = async () => {
  const response = await axios.post('/admin/publish-to-users');
  return response.status;
};
