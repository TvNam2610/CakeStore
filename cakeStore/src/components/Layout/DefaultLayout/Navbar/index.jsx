import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import Tippy from '@tippyjs/react/headless';
import * as flavorServices from '~/apiServices/flavorServices';
import * as cateServices from '~/apiServices/cateServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Navbar() {
    // fetch api flavor
    const [flavorData, setFlavorData] = useState([]);
    const [cateData, setCateData] = useState([]);

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
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await cateServices.getAllCate();
                setCateData(result);
            } catch (error) {
                console.error('Failed to fetch category data:', error);
                setCateData([]);
            }
        };
        fetchApi();
    }, []);
    return (
        <nav className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('nav')}>
                    <Tippy
                        interactive
                        placement="bottom"
                        render={(attrs) => (
                            <div className={cx('subnav')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className={cx('subnav-container')}>
                                        <ul className={cx('submenu-list')}>
                                            {cateData.map((item) => (
                                                <li>
                                                    <a href={`/product-by-category/${item.id}`} key={item.id}>
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('nav-item')}>
                            <span className={cx('nav-title')}>Category</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                            <div className={cx('hello')}></div>
                        </div>
                    </Tippy>
                    <Tippy
                        interactive
                        placement="bottom"
                        render={(attrs) => (
                            <div className={cx('subnav')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className={cx('subnav-container')}>
                                        <ul className={cx('submenu-list')}>
                                            {flavorData.map((item) => (
                                                <li>
                                                    <a href={`/product-by-flavor/${item.id}`} key={item.id}>
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('nav-item')}>
                            <span className={cx('nav-title')}>Flavors</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                            <div className={cx('hello')}></div>
                        </div>
                    </Tippy>
                    <div className={cx('nav-item')}>Trending Cakes</div>
                    <div className={cx('nav-item')}>Occasion</div>
                    <div className={cx('nav-item')}>Anniversary</div>
                    <div className={cx('nav-item')}>Blog</div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
