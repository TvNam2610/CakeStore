import * as request from '~/utils/request';

export const getAllFlavor = async (page, pageSize) => {
    try {
        const res = await request.get('flavor/', {
            body: { page, pageSize },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFlavors = async (proId) => {
    try {
        const res = await request.get(`flavor/${proId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
