import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '~/features/cartSlice';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as paymentService from '~/apiServices/paymentServices';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { formatPrice } from '~/utils/formatPrice';

function Order() {
    const userData = localStorage.getItem('UserData');
    const info = {
        userId: JSON.parse(userData).id,
        name: JSON.parse(userData).name,
        email: JSON.parse(userData).email,
        address: JSON.parse(userData).address,
        phone: JSON.parse(userData).phone,
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const orderDate = new Date();

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [formData, setFormData] = useState({
        name: info.name || '',
        address: info.address || '',
        phone: info.phone || '',
        email: info.email || '',
        note: '',
    });

    const getTotal = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        return { totalPrice, totalQuantity };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                ...formData,
                paymentMethod,
                orderDate,
                totalAmount: getTotal().totalPrice,
                userId: info.userId,
            };
            const orderResponse = await paymentService.createOrder(orderData);

            for (const item of cart) {
                const orderItemData = {
                    orderId: orderResponse.id,
                    name: item.name,
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                };
                const orderItemResponse = await paymentService.createOrderItem(orderItemData);
                dispatch(removeItem(item.id));
            }

            toast.success('Đặt hàng thành công', {
                position: 'top-right',
            });
            navigate('/order-confirm', { state: { ...formData, paymentMethod, totalAmount: getTotal().totalPrice } });
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__text">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__links">
                                <a href="/">Home</a>
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (paymentMethod === 'cod') {
                                    handlePlaceOrder();
                                }
                            }}
                        >
                            <div className="row">
                                <div style={{ position: 'relative' }} className="col-lg-8 col-md-6">
                                    <h6
                                        style={{
                                            position: 'absolute',
                                            top: '-100px',
                                            marginBottom: '100px',
                                            width: '100%',
                                        }}
                                        className="coupon__code"
                                    >
                                        <span className="icon_tag_alt" /> Have a coupon? <a href="#">Click here</a> to
                                        enter your code
                                    </h6>
                                    <h3 className="checkout__title">Billing Details</h3>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Name<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Address<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    required
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="checkout__input__add"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Phone<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Email<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__input__checkbox">
                                        <label htmlFor="diff-acc">
                                            Note about your order, e.g, special note for delivery
                                            <input type="checkbox" id="diff-acc" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="checkout__input">
                                        <div>
                                            Order notes<span>*</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                            id="note"
                                            name="note"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h3 className="order__title">Your order</h3>
                                        <div className="checkout__order__products">
                                            Product <span>Total</span>
                                        </div>
                                        <ul className="checkout__total__products">
                                            {cart?.map((item, index) => (
                                                <li key={index}>
                                                    <samp>{index + 1 + '. '}</samp> {item.name}{' '}
                                                    <span>{formatPrice(item.price * item.quantity)} </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className="checkout__total__all">
                                            <li>
                                                Subtotal <span>{formatPrice(getTotal().totalPrice)}</span>
                                            </li>
                                            <li>
                                                Total <span>{formatPrice(getTotal().totalPrice)}</span>
                                            </li>
                                        </ul>

                                        <div className="checkout__input__checkbox">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={() => setPaymentMethod('cod')}
                                                />
                                                Thanh toán khi nhận hàng
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="checkout__input__checkbox">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="paypal"
                                                    checked={paymentMethod === 'paypal'}
                                                    onChange={() => setPaymentMethod('paypal')}
                                                />
                                                Thanh toán bằng PayPal
                                                <span className="checkmark" />
                                            </label>
                                        </div>

                                        {paymentMethod === 'cod' && (
                                            <button type="submit" className="site-btn">
                                                PLACE ORDER
                                            </button>
                                        )}

                                        {paymentMethod === 'paypal' && (
                                            <PayPalScriptProvider
                                                options={{
                                                    'client-id':
                                                        'Aa9Y3y0VDtzVtxi44VQUfsk3Dg7LuibnHOQG2DeBRM6nDb7XgN_MXo6exiiCD0PDv5et0GHP3SlqGPWb',
                                                }}
                                            >
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: getTotal().totalPrice.toString(),
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then(async (details) => {
                                                            alert(
                                                                'Transaction completed by ' +
                                                                    details.payer.name.given_name,
                                                            );
                                                            await handlePlaceOrder();
                                                        });
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Order;
