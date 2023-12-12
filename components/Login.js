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
        <div className="flex flex-col grid justify-items-center text-white ">
                <div className="space-y-4 ">
                    <h1 className={styles.textTop}>eSport Coach</h1>
                    <h3 className={styles.textTop2}>Join the coaching platform.</h3>
                    <button className="bg-secondary" onClick={showSignUpModal}>Sign up</button>
                    {isSignUpModalVisible && <div id="react-signUpModals">
                         <Modal getContainer="#react-signUpModals" className={styles.modal} visible={isSignUpModalVisible} closable={true} footer={null} onCancel={()=> setIsSignUpModalVisible(false)}>
                            <SignUp />
                        </Modal>
                    </div>}
                    <p className="{styles.textBottom}">Already have an account?</p>
                    <button className="bg-secondary" onClick={showSignInModal}>Sign in</button>
                    {isSignInModalVisible && <div id="react-signInModals">
                        <Modal getContainer="#react-signInModals" className={styles.modal} visible={isSignInModalVisible} closable={true} footer={null} onCancel={()=> setIsSignInModalVisible(false)} >
                            <SignIn />
                        </Modal>
                    </div>}   
                </div> 
        </div>
	);
}

export default Login;


