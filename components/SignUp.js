"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/SignUp.module.css';
import Dropdown from 'react-bootstrap/Dropdown';


function SignUp() {

	const router = useRouter()

    const [signUpLastname, setSignUpLastname] = useState('');
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
<<<<<<< HEAD
					dispatch(login({ firstname: signUpFirstname, username: signUpUsername, token: data.token, isCoach: data.isCoach }));
                    setSignUpLastname('');
					setSignUpFirstname('');
=======
					dispatch(login({ firstname: data.firstname, username: data.username, token: data.token, isCoach: data.isCoach }));
                    setSignUpFirstname('');
>>>>>>> 8d9a7dc802dc9b77b4994aabb1b903b5c0698909
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
						id="signUpLastname" 
						onChange={(e) => setSignUpLastname(e.target.value)} 
						value={signUpLastname} 
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
<<<<<<< HEAD
					<label for="dog-names">I want to sign up as:</label>
						<select required> 
							<option value="Gamer" selected>Gamer</option> 
							<option value="Coach">Coach</option> 	
						</select>
				<button className={styles.signUp} id="signUpButton" onClick={() => handleSignUp()}>Sign Up and take the quiz</button>
=======
					<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								I want to sign up as
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={(e)=>setSignUpCoach(false)}>Gamer</Dropdown.Item>
								<Dropdown.Item onClick={(e)=>setSignUpCoach(true)}>Coach</Dropdown.Item>
							</Dropdown.Menu>
					</Dropdown>
					
				<button className={styles.signUp} id="signUpButton" onClick={() => handleSignUp()}>Sign up and take the quiz</button>
>>>>>>> 8d9a7dc802dc9b77b4994aabb1b903b5c0698909
			</div>
        </div>
	);
}

export default SignUp;
