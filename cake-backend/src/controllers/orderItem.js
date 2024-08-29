// controllers/orderItemController.js
import db from '../models';
import * as services from '../services'

const orderItemService = services.methodsService('OrderItem')

export const getOrderItemByProductId = async (req, res) => {
    try {
        const response = await orderItemService.find({ 
            where: { orderId: req.params.id } ,
            include: [
                {
                    model: db.Product,
                    attributes: ['image'], 
                },
            ],
            raw: true
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ code: -1, message: 'Something went wrong', error });
    }
}
export const createOrderItem = async (req, res) => {
    try {
        const { data, code, message } = await orderItemService.create(req.body);
        return res.status(code === 0 ? 201 : 400).json({ data, message });
    } catch (error) {
        console.error('Error in createOrder:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const   updateOrderItem = async (req, res) => {
    try {
        const response = await orderItemService.update({ where: { id: req.params.id }, data: req.body });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ code: -1, message: 'Something went wrong', error });
    }
}
export const  deleteOrderItem = async (req, res) => {
    try {
        const response = await orderItemService.delete({ where: { id: req.params.id } });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ code: -1, message: 'Something went wrong', error });
    }
}

