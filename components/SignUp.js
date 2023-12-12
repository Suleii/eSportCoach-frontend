"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/SignUp.module.css';



function SignUp() {

	const router = useRouter()

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signUpCoach, setSignUpCoach] = useState(false);

    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


    const handleSignUp = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword, isCoach: signUpCoach}),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ firstname: data.firstname, username: data.username, token: data.token, isCoach: data.isCoach }));
                    setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpPassword('');
					setSignUpCoach(false);
                    router.push('/');
				}
			});
	};


	return (
        <div className={styles.body}>	
			<div className={styles.container}>
				<img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
				<h2 className={styles.textSingUp}>Create your account</h2>
					<input className={styles.input}
						type="text" 
						placeholder="Last name" 
						id="signUpFirstname" 
						onChange={(e) => setSignUpFirstname(e.target.value)} 
						value={signUpFirstname} 
					/>
					<input className={styles.input}
						type="text" 
						placeholder="First name" 
						id="signUpUsername" 
						onChange={(e) => setSignUpUsername(e.target.value)} 
						value={signUpUsername} 
					/>
					<input className={styles.input}
						type="email" 
						placeholder="E-mail" 
						id="signUpUsername" 
						onChange={(e) => setSignUpUsername(e.target.value)} 
						value={signUpUsername} // modifier le value
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
					<div className="dropdown dropdown-bottom">
						<div tabIndex={0} role="button" className="btn m-1">Pick</div>
						<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
							<li onClick={(e) => setSignUpCoach(false)} ><a class="hover:bg-base-100 focus:bg-base-100">Gamer</a></li>
							<li onClick={(e) => setSignUpCoach(true)}><a class="hover:bg-base-100 focus:bg-base-100" >Coach</a></li>
						</ul>
					</div>
					
				<button className={styles.signUp} id="signUpButton" onClick={() => handleSignUp()}>Sign up and take the quiz</button>
			</div>
        </div>
	);
}

export default SignUp;
