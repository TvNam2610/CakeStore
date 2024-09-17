import request from '~/utils/request';

export const register = async (user) => {
    try {
        const res = await request.post('auth/register', {
            ...user,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (user) => {
    try {
        const res = await request.post('auth/login', {
            ...user,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
