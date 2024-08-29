import * as controllers from '../controllers/category'
import express from 'express'

const router = express.Router();

router.get('/:id', controllers.getCateById)
router.get('/', controllers.getCategory)

router.post('/', controllers.createCategory)
router.put('/:id', controllers.updateCategory)
router.delete('/:id', controllers.deleteCategory)
module.exports = router