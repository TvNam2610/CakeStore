import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin } from '../middleware/verify__roles';
import uploadCloud from '../middleware/uploader';
import { combineTableNames } from 'sequelize/lib/utils';

const router = express.Router();

//PUBLIC ROUTES
router.get('/:id', controllers.getById)
router.get('/', controllers.getProducts)
router.get('/:productId/similar', controllers.getSimilarProducts);
router.get('/flavor/:flavorId', controllers.getProductsByFlavor);
router.get('/statistics', controllers.getStatistics);
//PRIVATE ROUTES
router.post('/', controllers.createProduct)
router.put('/:id', controllers.updateProduct)
router.delete('/:id', controllers.deleteProduct)

router.post('/:productId/flavors', controllers.addFlavorsToProduct);

module.exports = router