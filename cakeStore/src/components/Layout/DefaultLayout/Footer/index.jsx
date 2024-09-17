import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/img';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('footer-sec')}>
                    <div className={cx('footer-sec-content')}>
                        <div className={cx('content')}>
                            <div>
                                <img src="https://media.bakingo.com/bakingo-ssr/static/media/truckIcon.55cbd167.svg" />
                            </div>
                            <div className={cx('image-text')}>100% On Time Delivery</div>
                        </div>
                        <img src="https://media.bakingo.com/bakingo-ssr/static/media/sideLine.8d8bded5.svg" />
                        <div className={cx('content')}>
                            <div>
                                <img src="https://media.bakingo.com/bakingo-ssr/static/media/cakeIcon.faab9cbf.svg" />
                            </div>
                            <div className={cx('image-text')}>100% Fresh & Hygienic</div>
                        </div>
                        <img src="https://media.bakingo.com/bakingo-ssr/static/media/sideLine.8d8bded5.svg" />
                        <div className={cx('content')}>
                            <div>
                                <img src="https://media.bakingo.com/bakingo-ssr/static/media/fssaiIcon.68ead701.svg" />
                            </div>
                            <div className={cx('image-text')}>FSSAI Certified</div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('subscribe-newsletter')}>Subscribes To Newsletter</div>
                        <form>
                            <div className={cx('input-group')} style={{ display: 'block' }}>
                                <input
                                    type="email"
                                    name="email"
                                    className={cx('email')}
                                    placeholder="Enter email address"
                                    required=""
                                />
                                <div className={cx('_loading_overlay_wrapper')}>
                                    <input type="submit" className={cx('subscribe')} defaultValue="Subscribe" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={cx('footer-main')}>
                    <div className={cx('main-sec')}>
                        <div className={cx('main-sec-left')}>
                            <div className="bakingo-image-year">
                                <img src={images.logo} alt="" className="bakingo-image-bottom" />

                                <div className={cx('stay-conn')}>
                                    Show us some love <span style={{ color: 'red' }}>❤</span>
                                    &amp; connect with us!
                                </div>
                                <div>
                                    <div className="all-logos">
                                        <a href="https://www.instagram.com/bakingo_official/" rel="nofollow">
                                            <div className="footer-instagram" />
                                        </a>
                                        <a href="https://www.facebook.com/bakingo/" rel="nofollow">
                                            <div className="footer-facebook" />
                                        </a>
                                        <a
                                            href="https://www.youtube.com/channel/UC7MsIUZGOOpVE_vHlklwM4Q"
                                            rel="nofollow"
                                        >
                                            <div className="footer-youtube" />
                                        </a>
                                        <a href="https://www.linkedin.com/company/bakingo/" rel="nofollow">
                                            <div className="footer-linkedIn" />
                                        </a>
                                        <a href="https://twitter.com/bakingo_online/" rel="nofollow">
                                            <div className="footer-twitter" />
                                        </a>
                                        <a href="https://www.pinterest.com/bakingo/" rel="nofollow">
                                            <div className="footer-pinterest" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('main-sec-center')}>
                            <div className={cx('footer-description')}>
                                <div className={cx('footer-heading')}>Know Us</div>
                                <div className={cx('description-bottom')}>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/about-us" className={cx('title')}>
                                            Our Story
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/contact-us" className={cx('title')}>
                                            Contact Us
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/locate-us" className={cx('title')}>
                                            Locate Us
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/blog" className={cx('title')}>
                                            Blog
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/contactus" className={cx('title')}>
                                            Need Help
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/show-media" className={cx('title')}>
                                            Media
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/career-page" className={cx('title')}>
                                            Careers
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('footer-description')}>
                                <div className={cx('footer-heading')}>Need Help</div>
                                <div className={cx('description-bottom')}>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/faq" className={cx('title')}>
                                            FAQ
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a
                                            href="https://www.bakingo.com/cancellation-and-refund-policy"
                                            className={cx('title')}
                                        >
                                            Cancellation and Refund
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/privacy-policy" className={cx('title')}>
                                            Privacy Policy
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/terms-and-conditions" className={cx('title')}>
                                            Terms and Conditions
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')} />
                                </div>
                            </div>

                            <div className={cx('footer-description')}>
                                <div className={cx('footer-heading')}>More Info</div>
                                <div className={cx('description-bottom')}>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/corporate-cakes" className={cx('title')}>
                                            Corporate Cakes
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/coupons-and-offers" className={cx('title')}>
                                            Coupons &amp; Offers
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/franchise" className={cx('title')}>
                                            Franchise
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/investorrelations" className={cx('title')}>
                                            Investor Relations
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/stamps" className={cx('title')}>
                                            Stamps
                                        </a>
                                    </div>
                                    <div className={cx('footer-listing')}>
                                        <a href="https://www.bakingo.com/download-app" className={cx('title')}>
                                            Download App
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('main-sec-right')}>
                            <div className={cx('exp-bakingo')}>Experience Bakingo App On Mobile</div>
                            <div className={cx('qr')}>
                                <div>
                                    <img
                                        src="https://media.bakingo.com/bakingo-ssr/static/media/Scanner.d034bfd2.svg"
                                        alt="app"
                                    />
                                </div>
                                <div>
                                    <div>
                                        <a
                                            href="https://play.google.com/store/apps/details?id=com.bakingo&referrer=utm_source%3Dallfooter%26utm_medium%3Dmsite%26anid%3Dadmob"
                                            target="_blank"
                                        >
                                            <img
                                                src="https://media.bakingo.com/bakingo-ssr/static/media/Play_Store.1e4355ea.svg"
                                                alt="app"
                                            />
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="https://apps.apple.com/in/app/bakingo-online-cake-delivery/id1495615464"
                                            target="_blank"
                                        >
                                            <img
                                                src="https://media.bakingo.com/bakingo-ssr/static/media/App_Store.70ef7c8c.svg"
                                                alt="app"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
