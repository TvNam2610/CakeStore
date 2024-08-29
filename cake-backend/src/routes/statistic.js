import * as controllers from '../controllers'
import express from 'express'
const router = express.Router();

//PUBLIC ROUTES
router.get('/', controllers.getStatistics)


module.exports = router