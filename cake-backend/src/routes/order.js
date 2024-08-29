import * as controllers from '../controllers'
import express from 'express'


const router = express.Router();

//PUBLIC ROUTES



//PRIVATE ROUTES
router.get('/orderByUser/:userId', controllers.getOrdersByUserId);
router.get('/', controllers.getOrder);
router.post('/orders', controllers.createOrder);
router.get('/order-item/:id', controllers.getOrderItemByProductId);
router.get('/:id', controllers.getOrderById);
router.post('/order-items', controllers.createOrderItem);

module.exports = router