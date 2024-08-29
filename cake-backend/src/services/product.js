
const db = require('../models');
import { Op } from 'sequelize';

export const getProduct = ({page, limit, order,name, ...query})  => new Promise(async (resolve, reject) => {
    try {
        const queries = {raw : true, nest : true}
        const offset = (!page || +page <= 1) ? 0:(+page -1)
        const fLimit = +limit || +process.env.LIMIT_CAKE
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if(order) queries.order = [order]
        if(name)  query.name = {[Op.substring]: name}
        const response = await db.Product.findAndCountAll({
            where: query,
            ...queries
        })
        resolve({
            err: response ? 0: 1,
            mes: response ? 'Got' : 'Cannot found cakes',
            data: response
        })
    }catch(error) {
        reject(error)
    }
})
export const getStatistics = async () => {
    try {
        // Tính tổng doanh thu
        const totalRevenue = await db.Order.sum('totalAmount');
        
        const totalItemsSold = await db.OrderItem.sum('quantity');

        // Tính tổng số lượng người dùng
        const totalUsers = await db.User.count();
        if (totalRevenue === null || totalItemsSold === null || totalUsers === null) {
            return {
                code: 1,
                message: 'Data is not existt!',
                data: [],
            };
        }
        return {
            code: 0,
            message: 'ok',
            data: {
                totalRevenue,
                totalItemsSold,
                totalUsers
            }

        };
    } catch (error) {
        console.log('🚀 ~ getStatistics: ~ error:', error);
        return {
            code: -1,
            message: 'Something wrong in the server',
            data: [{ error }],
        };
    }
}
