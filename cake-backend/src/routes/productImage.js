import * as controllers from '../controllers'
import express from 'express'


const router = express.Router();



// Route to add a new product image
router.get('/:productId/images', controllers.getProductImages);
router.post('/images', controllers.addProductImage);



module.exports = router