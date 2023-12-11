"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/SignIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Link from 'next/link';


function SignIn() {

    const router = useRouter()

    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


    const handleSignIn = () => {
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ firstname: data.firstname, username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/home');
				}
			});
	};


	return (
        <div className={styles.body}>
           {/* <FontAwesomeIcon className={styles.XmarkSignIn} icon={faXmark} data-dismiss="modal"  /> */}
            <img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
            <h2 className={styles.textSingIn}>Create your account</h2>
            <input className={styles.input}
                type="text" 
                placeholder="Username" 
                id="signInUsername" 
                onChange={(e) => setSignInUsername(e.target.value)} 
                value={signInUsername} 
            />
            <input className={styles.input}
                type="password" 
                placeholder="Password" 
                id="signInPassword" 
                onChange={(e) => setSignInPassword(e.target.value)} 
                value={signInPassword} 
            />
            <input type="checkbox" id="exampleUniq"/>
            <label for="exampleUniq">Remember me</label>
            <p>Forgot password?</p>
            <button className={styles.signIn} id="signInButton" onClick={() => handleSignIn()}>Sign in</button>
            <a href='/SignUp'>
                <p>Don't have an account? Please sign up.</p>
            </a>
            <p>or</p>
            <button >
            <img src='https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg'></img>
                Log in with Twitch
            </button>
        </div>
	);
}

export default SignIn;