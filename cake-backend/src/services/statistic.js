
const db = require('../models');

const statisticsService = {
    getStatistic: async () => {
        try {
            // Tính tổng doanh thu
            const totalRevenue = await db.OrderItem.sum('price', {
                include: [{
                    model: db.Order,
                    attributes: []
                }]
            });

            // Tính tổng số lượng sản phẩm đã bán
            const totalItemsSold = await db.OrderItem.sum('quantity');

            // Tính tổng số lượng người dùng
            const totalUsers = await db.User.count({
               where: {
                    role_code: "R2"
               }
            });

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
};

module.exports = statisticsService;
