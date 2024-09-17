import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderConfirm.scss';
import { formatPrice } from '~/utils/formatPrice';

const cx = classNames.bind(styles);

function OrderConfirm() {
    const location = useLocation();
    const { name, address, phone, email, note, totalAmount, paymentMethod } = location.state || {};
    console.log(location.state);

    return (
        <div>
            <div className={cx('order-confirm-container')}>
                <h2 className={cx('heading')}>Order Confirmation</h2>
                <div className={cx('order-details')}>
                    <h3 className={cx('sub-heading')}>Order Details</h3>
                    <p>Name: {name}</p>
                    <p>Address: {address}</p>
                    <p>Phone: {phone}</p>
                    <p>Email: {email}</p>
                    <p>Note: {note}</p>
                    <p>Total Amount: {formatPrice(totalAmount)}</p>
                    <p>Payment Method: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'}</p>
                    <p className={cx('payment-status')}>Status: {paymentMethod === 'cod' ? 'Not Paid' : 'Paid'}</p>
                </div>

                <div className="continue__btn">
                    <a href="/">Continue Shopping</a>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirm;
