import * as services from '../services'
const orderService = services.methodsService('Order')



export const getOrder = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await orderService.find({
        page: page,
        pageSize,
    });

    if (data.code === -1) {
        return res.status(500).json(data);
    }

    return res.status(200).json(data);
};
    // Lấy danh sách các đơn hàng
export const   getOrderById = async (req, res) => {
    try {
        const response = await orderService.find({ where: { id: req.params.id } });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ code: -1, message: 'Something went wrong', error });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await orderService.find({ where: { userId } });

        if (result.code === 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error('Error fetching orders by userId:', error);
        res.status(500).json({
            code: -1,
            message: 'Something went wrong on the server',
            data: [{ error }],
        });
    }
}

    // Tạo một đơn hàng mới
export const createOrder= async (req, res) => {
    try {
        const { data, code, message } = await orderService.create(req.body);
        return res.status(code === 0 ? 201 : 400).json({ data, message });
    } catch (error) {
        console.error('Error in createOrder:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

    // Cập nhật thông tin của một đơn hàng
    export const updateOrder = async (req, res) => {
        try {
            const { data, code, message } = await orderService.update({
                where: { id: req.params.id },
                data: req.body,
            });
            return res.status(code === 0 ? 200 : 400).json({ data, message });
        } catch (error) {
            console.error('Error in updateOrder:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Xóa một đơn hàng
    export const    deleteOrder = async (req, res) => {
        try {
            const { data, code, message } = await orderService.delete({
                where: { id: req.params.id },
            });
            return res.status(code === 0 ? 200 : 400).json({ data, message });
        } catch (error) {
            console.error('Error in deleteOrder:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }



