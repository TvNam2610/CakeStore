import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import * as paymentService from '~/apiServices/paymentServices';
import classNames from 'classnames/bind';
import styles from './OrderHistory.scss';
import { formatPrice } from '~/utils/formatPrice';

const cx = classNames.bind(styles);

function OrderHistory() {
    const userData = localStorage.getItem('UserData');
    const userId = JSON.parse(userData).id;
    const [orderData, setOrderData] = useState([]);

    // // fetch api product
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await paymentService.getOrder(userId);
                setOrderData(result);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
                setOrderData([]);
            }
        };
        fetchApi();
    }, [userId]);

    return (
        <div className={cx('order-history')}>
            <h2>Order History</h2>

            <ul>
                {orderData.map((order) => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Total Amount:{formatPrice(order.totalAmount)}</p>
                        <p>Payment method: {order.paymentMethod}</p>
                        <p>Status: {order.paymentMethod === 'paypal' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;
