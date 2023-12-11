"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Login.module.css';
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Link from 'next/link';


function Login() {

    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

    const showSignUpModal = () => {
		setIsSignUpModalVisible(!isSignUpModalVisible);
	};

    const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

    const showSignInModal = () => {
		setIsSignInModalVisible(!isSignInModalVisible);
	};

	return (
        <div className={styles.body}>
                <div className={styles.leftContainer}>
                    <img className={styles.logoLeftContainer} href="./home" src="logoTwitter2.png" alt="logo Twitter" />
                </div>

                <div className={styles.rightContainer}>
                    <div className={styles.rightInContainer}>
                        <img className={styles.logoRightContainer} href="./home" src="logoTwitter.png" alt="logo Twitter" />
                        <h1 className={styles.textTop}>eSport Coach</h1>
                        <h3 className={styles.textTop2}>Join the coaching platform.</h3>
                        <button className={styles.signUpButton} onClick={showSignUpModal}>Sign up</button>
                        {isSignUpModalVisible && <div id="react-signUpModals">
                            <Modal getContainer="#react-signUpModals" className={styles.modal} visible={isSignUpModalVisible} closable={false} footer={null}>
                                <SignUp />
                            </Modal>
                        </div>}
                        <p className={styles.textBottom}>Already have an account?</p>
                        <button className={styles.signInButton} onClick={showSignInModal}>Sign in</button>
                        {isSignInModalVisible && <div id="react-signInModals">
                            <Modal getContainer="#react-signInModals" className={styles.modal} visible={isSignInModalVisible} closable={false} footer={null}>
                                <SignIn />
                            </Modal>
                        </div>}
                        <p className={styles.textBottom}>You are coach?</p>
                        <button className={styles.signInButton} onClick={showSignInModal}>Sign in</button>
                        {isSignInModalVisible && <div id="react-signInModals">
                            <Modal getContainer="#react-signInModals" className={styles.modal} visible={isSignInModalVisible} closable={false} footer={null}>
                                <SignIn />
                            </Modal>
                        </div>}
                    </div> 
                </div>
            
        </div>
	);
}

export default Login;


