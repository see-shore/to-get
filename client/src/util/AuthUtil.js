import axios from 'axios';

export const setToken = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
