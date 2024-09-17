import * as request from '~/utils/request';

export const getConfig = async () => {
    try {
        const res = await request.get('payment/config');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async (userId) => {
    try {
        const res = await request.get(`order/orderByUser/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createOrder = async (orderData) => {
    const response = await request.post('order/orders', orderData);
    return response.data;
};

export const createOrderItem = async (orderItemData) => {
    const response = await request.post('order/order-items', orderItemData);
    return response.data;
};
