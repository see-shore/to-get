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

export const createNewCredentials = async (userData, token) => {
  return await axios({
    method: 'post',
    url: '/dbconnections/signup',
    baseURL: "https://" + process.env.REACT_APP_AUTH0_DOMAIN,
    data: {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      connection: process.env.REACT_APP_AUTH0_CONNECTION,
      email: userData.email,
      password: userData.password,
      given_name: userData.firstName,
      family_name: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
