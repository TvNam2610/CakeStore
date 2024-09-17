import classNames from 'classnames/bind';
import styles from './login.scss';
import { useState } from 'react';
import * as authServices from '~/apiServices/authServices';
import { json, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [isActive, setIsActive] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        };

        const fetchApi = async () => {
            try {
                const result = await authServices.register(user);
                alert('Register Success!');
            } catch (error) {
                throw error;
            }
        };
        fetchApi();
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: loginEmail,
            password: loginPassword,
        };

        const fetchApi = async () => {
            try {
                const result = await authServices.login(user);
                localStorage.setItem('token', result.access_token);
                const data = JSON.stringify(result.data);
                localStorage.setItem('UserData', data);
                navigate('/');
                alert('Login success');
            } catch (error) {
                throw error;
            }
        };
        fetchApi();
    };

    return (
        <div className={cx('container')} id="container">
            <div className={cx('login', `${isActive ? 'active' : ''}`)}>
                <div className={cx('form-container', 'sign-up')}>
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Create Account</h1>

                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={cx('form-container', 'sign-in')}>
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>

                        <span>or use your email password</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className={cx('toggle-container')}>
                    <div className={cx('toggle')}>
                        <div className={cx('toggle-panel', 'toggle-left')}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button
                                className={cx('hidden', `${isActive ? '' : 'active'}`)}
                                id="login"
                                onClick={handleLoginClick}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className={cx('toggle-panel', 'toggle-right')}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button
                                className={cx('hidden', `${isActive ? '' : 'active'}`)}
                                id="register"
                                onClick={handleRegisterClick}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
