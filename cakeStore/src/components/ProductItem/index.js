import classNames from "classnames/bind";
import styles from './ProductItem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={data.image}
                alt="cake"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                </h4>
                <span className={cx('price')}>${data.price}</span>
            </div>
        </div>
    );
}

export default ProductItem;