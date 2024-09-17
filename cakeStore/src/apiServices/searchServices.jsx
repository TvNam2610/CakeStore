import * as request from '~/utils/request';

export const search = async (name, page = 1, limit = 10, order = 'name') => {
    try {
        const res = await request.get('product/', {
            params: {
                name,
                page,
                limit,
                order,
            },
        });
        return res.data.rows || [];
    } catch (error) {
        console.log(error);
    }
};
