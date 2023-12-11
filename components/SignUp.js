"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/SignUp.module.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Link from 'next/link';


function SignUp() {

	const router = useRouter()

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');

    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


    const handleSignUp = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ firstname: signUpFirstname, username: signUpUsername, token: data.token }));
                    setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpPassword('');
                    router.push('/home');
				}
			});
	};


	return (
        <div className={styles.body}>	
			<div className={styles.container}>
				{/* <FontAwesomeIcon className={styles.XmarkSignUp} icon={faXmark} data-dismiss="modal" /> */}
				<img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
				<h2 className={styles.textSingUp}>Create your account</h2>
					<input className={styles.input}
						type="text" 
						placeholder="Firstname" 
						id="signUpFirstname" 
						onChange={(e) => setSignUpFirstname(e.target.value)} 
						value={signUpFirstname} 
					/>
					<input className={styles.input}
						type="text" 
						placeholder="Username" 
						id="signUpUsername" 
						onChange={(e) => setSignUpUsername(e.target.value)} 
						value={signUpUsername} 
					/>
					<input className={styles.input}
						type="password" 
						placeholder="Password" 
						id="signUpPassword" 
						onChange={(e) => setSignUpPassword(e.target.value)} 
						value={signUpPassword} 
					/>
				<button className={styles.signUp} id="signUpButton" onClick={() => handleSignUp()}>Sign up</button>
			</div>
        </div>
	);
}

export default SignUp;
