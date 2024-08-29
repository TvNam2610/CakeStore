import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin } from '../middleware/verify__roles';

const router = express.Router();

//PUBLIC ROUTES
router.get('/getAll', controllers.getAllUsers)


//PRIVATE ROUTES
router.use(verifyToken)
router.use(isAdmin)
router.get('/', controllers.getCurrent)

module.exports = router