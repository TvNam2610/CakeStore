import classNames from 'classnames/bind';
import styles from './home.scss';
import images from '~/assets/img';
import { ProductCard } from '~/components/ProductCard';
import * as productServices from '~/apiServices/productServices';
import * as flavorServices from '~/apiServices/flavorServices';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackToTopButton from '~/components/Backtotop';

const cx = classNames.bind(styles);

function Home() {
    const [productData, setProductData] = useState([]);
    const [flavorData, setFlavorData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await productServices.getTopSellers();
                setProductData(result.rows);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
                setProductData([]);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await flavorServices.getAllFlavor(1, 10);
                setFlavorData(result);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
                setFlavorData([]);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('banner-img')}>
                    <img src={images.banner1} alt="banner" />
                </div>
            </div>

            <section className={cx('flavors')}>
                <h2 className={cx('section-title')}>Experience Flavors</h2>
                <div className={cx('flavor-lists')}>
                    {flavorData.map((item) => (
                        <Link to={`/product-by-flavor/${item.id}`} key={item.id} className={cx('flavor-item')}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </section>

            <section className={cx('best-sellers')}>
                <div className={cx('_container')}>
                    <div className={cx('section-heading')}>
                        <h2 className={cx('section-title')}>Our Best Sellers</h2>
                        <button className={cx('viewAll')}>View All</button>
                    </div>
                    <div className={cx('product-slider')}>
                        {productData.map((item) => (
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
            </section>

            <section className={cx('trending')}>
                <div className={cx('_container')}>
                    <div className={cx('section-heading')}>
                        <h2 className={cx('section-title')}>Trending Cakes</h2>
                        <button className={cx('viewAll')}>View All</button>
                    </div>
                    <div className={cx('trend-list')}>
                        <a className={cx('trending-card')}>
                            <div className={cx('trend-img')}>
                                <img
                                    src="https://bkmedia.bakingo.com/photo_pulling_cake_desktop.jpg?tr=w-484,dpr-1.5,q-70"
                                    alt="trending"
                                />
                            </div>
                            <div className={cx('trend-title')}>Photo Pulling Cakes</div>
                        </a>
                        <a className={cx('trending-card')}>
                            <div className={cx('trend-img')}>
                                <img
                                    src="https://bkmedia.bakingo.com/pinata_cake_desktop.jpg?tr=w-484,dpr-1.5,q-70"
                                    alt="trending"
                                />
                            </div>
                            <div className={cx('trend-title')}>Bomb Cakes</div>
                        </a>
                        <a className={cx('trending-card')}>
                            <div className={cx('trend-img')}>
                                <img
                                    src="https://bkmedia.bakingo.com/pull_me_up_cake_desktop.jpg?tr=w-484,dpr-1.5,q-70"
                                    alt="trending"
                                />
                            </div>
                            <div className={cx('trend-title')}>Pinata Cakes</div>
                        </a>
                        <a className={cx('trending-card', 'bigImg')}>
                            <div className={cx('trend-img')}>
                                <img
                                    src="https://bkmedia.bakingo.com/bomb_cake_desktop.jpg?tr=w-484,dpr-1.5,q-70"
                                    alt="trending"
                                />
                            </div>
                            <div className={cx('trend-title')}>Photo Cakes</div>
                        </a>
                        <a className={cx('trending-card', 'bigImg')}>
                            <div className={cx('trend-img')}>
                                <img
                                    src="https://bkmedia.bakingo.com/surprise_cake_box_desktop.jpg?tr=w-484,dpr-1.5,q-70"
                                    alt="trending"
                                />
                            </div>
                            <div className={cx('trend-title')}>Photo Cakes</div>
                        </a>
                    </div>
                </div>
            </section>

            <section className={cx('blogs')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading')}>
                        <h2 className={cx('section-title')}>Read Some Of Our Recent Blog Posts</h2>
                        <button className={cx('viewAll')}>View All</button>
                    </div>
                    <div className={cx('blog-card-slider')}>
                        <a href="#" className={cx('blogCard')}>
                            <div className={cx('img')}>
                                <img
                                    src="https://www.bakingo.com/blog/wp-content/uploads/2024/04/Cover-D.jpg?tr=w-266,dpr-1.5,q-70"
                                    alt="blog-img"
                                />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('blog-title')}>
                                    Baking Basics: The Importance of Preheating Your Oven
                                </div>
                                <div className={cx('desc')}>
                                    Aadi, a novice baker, carefully measures out flour and sugar on his kitchen counter.
                                    Across from his, Bakingo’s Chef, a seasoned baker with years of experience, preps
                                    his own ingredients. As they chat, the topic of preheating the oven comes up.
                                </div>
                            </div>
                        </a>
                        <a href="#" className={cx('blogCard')}>
                            <div className={cx('img')}>
                                <img
                                    src="https://www.bakingo.com/blog/wp-content/uploads/2024/04/Cover-Desktop.jpg?tr=w-266,dpr-1.5,q-70"
                                    alt="blog-img"
                                />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('blog-title')}>
                                    The Ultimate Guide to Cake Decorations for Beginners
                                </div>
                                <div className={cx('desc')}>
                                    Cake decoration is a beautiful blend of art and science. Whether you’re a beginner
                                    or an experienced baker, this ultimate guide will walk you through the basics of
                                    cake decoration.
                                </div>
                            </div>
                        </a>
                        <a href="#" className={cx('blogCard')}>
                            <div className={cx('img')}>
                                <img
                                    src="https://www.bakingo.com/blog/wp-content/uploads/2024/04/Cover-Desktop.jpg?tr=w-266,dpr-1.5,q-70"
                                    alt="blog-img"
                                />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('blog-title')}>
                                    The Ultimate Guide to Cake Decorations for Beginners
                                </div>
                                <div className={cx('desc')}>
                                    Cake decoration is a beautiful blend of art and science. Whether you’re a beginner
                                    or an experienced baker, this ultimate guide will walk you through the basics of
                                    cake decoration.
                                </div>
                            </div>
                        </a>
                        <a href="#" className={cx('blogCard')}>
                            <div className={cx('img')}>
                                <img
                                    src="https://www.bakingo.com/blog/wp-content/uploads/2024/04/Cover-Desktop.jpg?tr=w-266,dpr-1.5,q-70"
                                    alt="blog-img"
                                />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('blog-title')}>
                                    The Ultimate Guide to Cake Decorations for Beginners
                                </div>
                                <div className={cx('desc')}>
                                    Cake decoration is a beautiful blend of art and science. Whether you’re a beginner
                                    or an experienced baker, this ultimate guide will walk you through the basics of
                                    cake decoration.
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <BackToTopButton />
        </div>
    );
}

export default Home;
