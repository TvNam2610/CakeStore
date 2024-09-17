import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import { formatPrice } from '~/utils/formatPrice';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

export function ProductCard(props) {
    return (
        <div className={cx('product-card-slider')} key={props.id}>
            <Link to={`/shopDetail/${props.id}`} className={cx('productCard')}>
                <div className={cx('productImage')}>
                    <img src={props.image} alt="product-img" />
                </div>
                <div className={cx('productCard-content')}>
                    <span className={cx('productName')}>{props.name}</span>
                    <div className={cx('content-center')}>
                        <div className={cx('product-price')}>{formatPrice(props.price)}</div>
                        {/* <div className={cx('saleOff')}>(props.saleOff% OFF)</div> */}
                    </div>
                    <div className={cx('content-bottom')}>
                        <div className={cx('productRating')}>
                            <span>{props.rating}</span>
                            <FontAwesomeIcon className={cx('star')} icon={faStar} />
                        </div>
                        <div className={cx('total-sales')}>{props.totalSales} sold</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
