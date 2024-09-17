import { useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '~/features/cartSlice';
import { useDispatch } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice';

function Cart() {
    const heightStyle = { height: '90px' };
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const getTotal = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        return { totalPrice, totalQuantity };
    };

    return (
        <section className="shopping-cart spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="shopping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img style={heightStyle} src={item.image} alt="" />
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>{item.name}</h6>
                                                    <h5>{formatPrice(item.price)}</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn"
                                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                                        >
                                                            -
                                                        </span>
                                                        <input type="text" value={item.quantity} readOnly />
                                                        <span
                                                            className="inc qtybtn"
                                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price"> {formatPrice(item.price * item.quantity)}</td>
                                            <td className="cart__close" onClick={() => dispatch(removeItem(item.id))}>
                                                <span className="icon_close" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn">
                                    <a href="/">Continue Shopping</a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn update__btn">
                                    <a href="#">
                                        <i className="fa fa-spinner" /> Update cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4" style={{ padding: '0 40px' }}>
                        <div className="cart__discount">
                            <h3>DISCOUNT CODE</h3>
                            <form action="#">
                                <input type="text" placeholder="Coupon code" />
                                <button type="submit">Apply</button>
                            </form>
                        </div>
                        <div className="cart__total">
                            <h3>Cart total</h3>
                            <ul>
                                <li>
                                    Subtotal <span>$ {getTotal().totalPrice}</span>
                                </li>
                                <li>
                                    Total <span>$ {getTotal().totalPrice}</span>
                                </li>
                            </ul>
                            <a href="/order" className="primary-btn">
                                Proceed to checkout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;
