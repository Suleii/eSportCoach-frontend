"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/SignUp.module.css';



function SignUp() {

	const router = useRouter()

    const [signUpLastname, setSignUpLastname] = useState('');
	const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpMail, setSignUpMail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signUpCoach, setSignUpCoach] = useState(false);

    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


    const handleSignUp = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ lastname: signUpLastname, firstname: signUpFirstname, username: signUpUsername, mail: signUpMail, password: signUpPassword, isCoach: signUpCoach}),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ lastname: data.lastname, firstname: data.firstname, username: data.username, mail: data.mail, token: data.token, isCoach: data.isCoach }));
                    setSignUpLastname('');
					setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpMail('');
					setSignUpPassword('');
					setSignUpCoach(false);
                    router.push('/home');
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
						id="signUpLastname" 
						onChange={(e) => setSignUpLastname(e.target.value)} 
						value={signUpLastname} 
					/>
					<input className={styles.input}
						type="text" 
						placeholder="First name" 
						id="signUpFirstname" 
						onChange={(e) => setSignUpFirstname(e.target.value)} 
						value={signUpFirstname} 
					/>
					<input className={styles.input}
						type="email" 
						placeholder="E-mail" 
						id="signUpMail" 
						onChange={(e) => setSignUpMail(e.target.value)} 
						value={signUpMail}
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
							<li className="bg-blue-500 select:focus" onClick={(e) => setSignUpCoach(false)} ><a >Gamer</a></li>
							<li className="btn btn-outline text-white active:[white]" onClick={(e) => setSignUpCoach(true)}><a >Coach</a></li>
						</ul>
					</div>
					<br></br>
				<button className={styles.signUp} id="signUpButton" onClick={() => handleSignUp()}>Sign up and take the quiz</button>
			</div>
        </div>
	);
}

export default SignUp;
