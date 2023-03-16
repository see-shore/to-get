import axios from 'axios';

export const getOrders = async () => {
  const response = await axios.get('/order/all');
  return response.data;
};

export const getMyOrders = async (userId) => {
  const response = await axios.get(`/order?userId=${userId}`);
  return response.data;
};

export const createOrders = async (ordersData, orderTotal) => {
  const response = await axios.post(`/order/new/batch?orderTotal=${orderTotal}`, ordersData);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await axios.delete(`/order?orderId=${orderId}`);
  return response.status;
};
