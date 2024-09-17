import Home from '~/pages/Home'
import Blog from '~/pages/Blog'
import Order from '~/pages/Order'
import Favorite from '~/pages/Favorite'
import Cart from '~/pages/Cart/Cart'
import Login from '~/pages/Login'
import Help from '~/pages/Help'
import OrderHistory from '~/pages/OrderHistory'
import ShopDetail from '~/pages/ShopDetail'
import OrderConfirmation from '~/pages/OrderConfirmation'
import Shop from '~/pages/Shop'
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/blog', component: Blog },
    { path: '/favorite', component: Favorite },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login, layout: null },
    { path: '/help', component: Help },
    { path: '/order', component: Order },
    { path: '/shopDetail/:id', component: ShopDetail },
    { path: '/order-confirm', component: OrderConfirmation },
    { path: '/order-history', component: OrderHistory },
    { path: '/product-by-flavor/:id', component: Shop },
    { path: '/product-by-category/:id', component: Shop },
    { path: '/shop', component: Shop },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }