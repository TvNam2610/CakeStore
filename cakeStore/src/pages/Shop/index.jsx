// pages/ProductsByFlavor.js
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as productService from '~/apiServices/productServices';
import { ProductCard } from '~/components/ProductCard';
import classNames from 'classnames/bind';
import styles from './ProductsByFlavor.scss';

const cx = classNames.bind(styles);

function ProductsByFlavor() {
    const { id } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            let result;
            if (location.pathname.includes('/product-by-flavor/')) {
                result = await productService.getProductByFlavor(id);
                setProducts(result);
            } else if (location.pathname.includes('/product-by-category/')) {
                result = await productService.getProductByCategory(id);
                setProducts(result.rows);
            } else {
                result = await productService.getAllProducts();
                setProducts(result.rows);
            }
        };

        fetchProducts();
    }, [id, location.pathname]);
    console.log(products);

    return (
        <div className="container">
            <div className={cx('products')}>
                <h1>{`Products with selected: ${products.length} cakes`}</h1>
                <div className={cx('product-slider')}>
                    {products.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            totalSales={item.totalSales}
                            rating={item.rating}
                            saleOff={item.saleOff}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsByFlavor;
