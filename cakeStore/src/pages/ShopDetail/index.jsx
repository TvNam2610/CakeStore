import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/features/cartSlice';
import { useParams } from 'react-router-dom';

import * as productServices from '~/apiServices/productServices';
import * as cateServices from '~/apiServices/cateServices';
import * as flavorServices from '~/apiServices/flavorServices';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './ShopDetails.module.scss';
import classNames from 'classnames/bind';
import { formatPrice } from '~/utils/formatPrice';
const cx = classNames.bind(styles);

function ShopDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cateName, setCateName] = useState('');
    const [image, setImage] = useState([]);
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);

    //fetch
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productServices.getById(id);
                setProduct(response);
                setMainImage(response.image);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };

        fetchProduct();

        const fetchImage = async () => {
            try {
                const response = await productServices.getProductImages(id);
                setImage(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };

        fetchImage();

        const fetchcate = async () => {
            try {
                const response = await cateServices.getById(id);
                setCateName(response.name);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };

        fetchcate();

        const fetchFlavors = async () => {
            try {
                const response = await flavorServices.getFlavors(id);
                setFlavors(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };

        fetchFlavors();
    }, [id]);

    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <section className={cx('product-details', 'spad')}>
                <div className="container">
                    <h1 className={cx('heading')}>Product detail</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={cx('product__details__img')}>
                                <div className={cx('product__details__big__img')}>
                                    <img className={cx('big_img')} src={mainImage} alt={product.name} />
                                </div>
                                <div className={cx('product__details__thumb')}>
                                    <div
                                        className={cx('pt__item', mainImage === product.image && 'active')}
                                        onClick={() => setMainImage(product.image)}
                                    >
                                        <img src={product.image} alt="img" />
                                    </div>

                                    {image.map((item) => (
                                        <div
                                            key={item.id}
                                            className={cx('pt__item', mainImage === item.imageUrl && 'active')}
                                            onClick={() => setMainImage(item.imageUrl)}
                                        >
                                            <img src={item.imageUrl} alt="img" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={cx('product__details__text')}>
                                {/* <div className={cx('product__label')}>Cupcake</div> */}
                                <h4>{product.name}</h4>
                                <h5>{formatPrice(product.price)}</h5>
                                <p>{product.description}</p>
                                <ul>
                                    <li>
                                        SKU: <span>{`CAK${product.id}`}</span>
                                    </li>
                                    <li>
                                        Category: <span>{cateName}</span>
                                    </li>
                                    <li>
                                        Flavors:{' '}
                                        <span>
                                            {flavors.map((flavor) => flavor['Flavor.name']).map((item) => item + ' , ')}
                                        </span>
                                    </li>
                                </ul>
                                <div className={cx('product__details__option')}>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image,
                                                }),
                                            )
                                        }
                                        className={cx('primary-btn', 'cart-btn')}
                                    >
                                        Add to cart
                                    </button>
                                    <a href="#" className={cx('heart__btn')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('heart__icon')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShopDetail;
