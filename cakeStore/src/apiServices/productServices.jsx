import * as request from '~/utils/request';

export const getTopSellers = async () => {
    try {
        const res = await request.get('product/?order[]=totalSales&order[]=DESC&limit=8');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllProducts = async () => {
    try {
        const res = await request.get('product/?limit=100');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProductImages = async (proId) => {
    try {
        const res = await request.get(`product/${proId}/images`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProductByFlavor = async (flaId) => {
    try {
        const res = await request.get(`product/flavor/${flaId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProductByCategory = async (category_id) => {
    try {
        const res = await request.get(`product/?category_id=${category_id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const res = await request.get(`product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
