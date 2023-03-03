import axios from 'axios';

export const getOrders = async () => {
    const response = await axios.get('/order/all');
    return response.data;
};

export const createOrders = async (ordersData) => {
    const response = await axios.post('/order/new/batch', ordersData);
    return response.data;
};
