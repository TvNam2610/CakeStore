import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useSelector } from 'react-redux';

// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css'; // optional
import images from '~/assets/img';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header() {
    const isToken = localStorage.getItem('token');

    const cart = useSelector((state) => state.cart);

    const getTotalQuantity = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-top')}>
                <div className={cx('container')}>
                    <div className={cx('topBar-content')}>
                        <span>
                            <FontAwesomeIcon icon={faPhone} />
                            Hotline:
                            <strong> 0971926588 </strong>
                            (Monday -Sunday: 9:00-20:00)
                        </span>
                        <span>Shop bánh kem, hoa tươi và các loại quà tặng sinh nhật</span>
                    </div>
                </div>
            </div>
            <div className={cx('header-main')}>
                <div className={cx('container')}>
                    <a href="/" className={cx('logo')}>
                        <img src={images.logo} alt="logo" />
                    </a>

                    <Search />

                    <div className={cx('header-groupIcon')}>
                        <div className={cx('header-icon')}>
                            <a href="#">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </a>
                            <span className={cx('icon-name')}>Help</span>
                        </div>
                        <div className={cx('header-icon')}>
                            <a href="/cart">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span className={cx('cart-count')}>{getTotalQuantity() || 0}</span>
                            </a>
                            <span className={cx('icon-name')}>Cart</span>
                        </div>

                        {isToken ? (
                            <Tippy
                                interactive
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div className={cx('drop-data-header')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('people-content')}>
                                                <a href="/myprofile">
                                                    <div className={cx('loggedIn-header-icon')}></div>
                                                </a>
                                                <div className={cx('people-name')}>tran van nam</div>
                                            </div>
                                            <a href="#" className={cx('dropdown-item')} role="button">
                                                <div className={cx('moreHeader-item')}>
                                                    <div className={cx('header-orders-icon')}>
                                                        <img
                                                            src="https://bkmedia.bakingo.com/ssr-static/myorders.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <a href="/shop" className={cx('moreHeader-heading')}>
                                                        Shopping
                                                    </a>
                                                </div>
                                            </a>
                                            <a href="#" className={cx('dropdown-item')} role="button">
                                                <div className={cx('moreHeader-item')}>
                                                    <div className={cx('header-orders-icon')}>
                                                        <img
                                                            src="https://bkmedia.bakingo.com/ssr-static/myorders.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <a href="/order-history" className={cx('moreHeader-heading')}>
                                                        My Order
                                                    </a>
                                                </div>
                                            </a>
                                            <a href="#" className={cx('dropdown-item')} role="button">
                                                <div className={cx('moreHeader-item')}>
                                                    <div className={cx('header-orders-icon')}>
                                                        <img
                                                            src="https://bkmedia.bakingo.com/ssr-static/wishlistHeart.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className={cx('moreHeader-heading')}>Wishlist</div>
                                                </div>
                                            </a>
                                            <a href="#" className={cx('dropdown-item')} role="button">
                                                <div className={cx('moreHeader-item')}>
                                                    <div className={cx('header-orders-icon')}>
                                                        <img
                                                            src="https://bkmedia.bakingo.com/ssr-static/manageAddr.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className={cx('moreHeader-heading')}>Manage Address</div>
                                                </div>
                                            </a>
                                            <a href="/login" className={cx('dropdown-item')} role="button">
                                                <div className={cx('moreHeader-item')}>
                                                    <div className={cx('header-orders-icon')}>
                                                        <img
                                                            src="https://bkmedia.bakingo.com/ssr-static/logout.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className={cx('moreHeader-heading')}>Logout</div>
                                                </div>
                                            </a>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('header-icon')}>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                    <span className={cx('icon-name')}>My Account</span>
                                </div>
                            </Tippy>
                        ) : (
                            <div className={cx('header-icon')}>
                                <a href="/login">
                                    <FontAwesomeIcon icon={faUser} />
                                </a>
                                <span className={cx('icon-name')}>Sign In</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
