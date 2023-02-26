import axios from 'axios';

export const getOrders = async () => {
    const response = await axios.get('/order/all');
    return response.data;
};
