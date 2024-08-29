import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin } from '../middleware/verify__roles';
import uploadCloud from '../middleware/uploader';

const router = express.Router();

//PUBLIC ROUTES
// router.get('/getAll', controllers.getAllFlavor)
router.get('/', controllers.getFlavor)
router.get('/:productId', controllers.getProductFlavors)


//PRIVATE ROUTES
router.post('/', controllers.createFlavor)
router.put('/:id', controllers.updateFlavor)
router.delete('/:id', controllers.deleteFlavor)

module.exports = router