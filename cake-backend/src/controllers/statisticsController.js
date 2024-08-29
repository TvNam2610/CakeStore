const statisticsService = require('../services/statistic');

const getStatistics = async (req, res) => {
    try {
        const response = await statisticsService.getStatistics();
        return res.status(200).json(response);
    } catch (error) {
        console.log('🚀 ~ getStatistics: ~ error:', error);
        return res.status(500).json({
            code: -1,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getStatistics
};
