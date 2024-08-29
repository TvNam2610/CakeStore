import user from './user'
import auth from './auth'
import category from './category'
import product from './product'
import flavor from './flavor'
import productImage from './productImage'
import order from './order'
import payment from './payment'
import statistic from './statistic'
import { internalServerError } from '../middleware/handle_error'

const initRoutes= (app) => {
    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/category', category)
    app.use('/api/v1/product', product)
    app.use('/api/v1/flavor', flavor)
    app.use('/api/v1/product', productImage)
    app.use('/api/v1/order', order)
    app.use('/api/v1/payment', payment)
    app.use('/api/v1/statistic', statistic)


    // app.use(internalServerError)
}

module.exports = initRoutes