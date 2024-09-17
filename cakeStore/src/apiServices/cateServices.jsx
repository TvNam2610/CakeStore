import * as request from '~/utils/request';

export const getById = async (id) => {
    try {
        const res = await request.get(`category/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCate = async () => {
    try {
        const res = await request.get('category/');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
