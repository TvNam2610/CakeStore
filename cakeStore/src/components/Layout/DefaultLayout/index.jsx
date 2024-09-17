import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss'
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from './Footer';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (<div className={cx('wrapper')}>
        <Header />
        <Navbar />
        <div className={cx('container')}>
            <div className={cx('content')}>
                {children}
            </div>
        </div>

        <Footer />
    </div>)
}

export default DefaultLayout;