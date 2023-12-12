"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';
import styles from '../styles/Login.module.css';
//import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { login, logout } from '../reducers/user';


function Login() {

    // const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

    // const showSignUpModal = () => {
	// 	setIsSignUpModalVisible(!isSignUpModalVisible);
	// };

    // const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

    // const showSignInModal = () => {
	// 	setIsSignInModalVisible(!isSignInModalVisible);
	// };
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
        }

        const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    


    const handleSignIn = () => {
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ firstname: data.firstname, username: signInUsername, token: data.token , isCoach: data.isCoach}));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/home');
				}
			});
	};


	return (
        <div className="flex flex-col grid justify-items-center text-white ">
            <div className="space-y-4 ">
                <h1 className={styles.textTop}>eSport Coach</h1>
                <h3 className={styles.textTop2}>Join the coaching platform.</h3>

                {/* BOUTON SIGN UP */}
                <button className="bg-success h-10 w-24 rounded-lg" onClick={()=>document.getElementById('my_modal_1').showModal()}>Sign Up</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-bck-img">
                        <div className="flex flex-col space-y-4 grid justify-items-center h-96 ">
                            <img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
                            <h2 className={styles.textSingUp}>Create your account</h2>
                            <input className="bg-base-100 w-64 h-8 rounded-md p-2"
                                type="text" 
                                placeholder="Last name" 
                                id="signUpLastname" 
                                onChange={(e) => setSignUpLastname(e.target.value)} 
                                value={signUpLastname} 
                            />
                            <input className="bg-base-100 w-64 h-8 rounded-md p-2"
                                type="text" 
                                placeholder="First name" 
                                id="signUpFirstname" 
                                onChange={(e) => setSignUpFirstname(e.target.value)} 
                                value={signUpFirstname} 
                            />
                            <input className="bg-base-100 w-64 h-8 rounded-md p-2"
                                type="email" 
                                placeholder="E-mail" 
                                id="signUpMail" 
                                onChange={(e) => setSignUpMail(e.target.value)} 
                                value={signUpMail}
                            />
                            <input className="bg-base-100 w-64 h-8 rounded-md p-2"
                                type="text" 
                                placeholder="Username" 
                                id="signUpUsername" 
                                onChange={(e) => setSignUpUsername(e.target.value)} 
                                value={signUpUsername} 
                            />
                            <input className="bg-base-100 w-64 h-8 rounded-md p-2"
                                type="password" 
                                placeholder="Password" 
                                id="signUpPassword" 
                                onChange={(e) => setSignUpPassword(e.target.value)} 
                                value={signUpPassword} 
                            />
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="btn m-1 bg-success">Choose :</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
                                    <li onClick={(e) => setSignUpCoach(false)} ><a class="hover:bg-base-100 focus:bg-base-100">Gamer</a></li>
                                    <li onClick={(e) => setSignUpCoach(true)}><a class="hover:bg-base-100 focus:bg-base-100" >Coach</a></li>
                                </ul>
                            </div>
                                
                            <button className="text-white" onClick={() => handleSignUp()}>Sign up and take the quiz</button>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="bg-success h-10 w-10 rounded-full">X</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <p className="{styles.textBottom}">Already have an account?</p>

                {/* BOUTON SIGN IN */}
                <button className="bg-success h-10 w-24 rounded-lg" onClick={()=>document.getElementById('my_modal_2').showModal()}>Sign In</button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box bg-bck-img ">
                        <div className="flex flex-col grid justify-items-center h-96 ">
                            <img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
                            <h2 className={styles.textSingIn}>Create your account</h2>
                            <input className='bg-base-100 w-64 h-8 rounded-md p-2'
                                type="text" 
                                placeholder="Username" 
                                id="signInUsername" 
                                onChange={(e) => setSignInUsername(e.target.value)} 
                                value={signInUsername} 
                            />
                            <input className='bg-base-100 w-64 h-8 rounded-md p-2'
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
                        <div className="modal-action">
                            <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                                <button className="bg-success h-10 w-10 rounded-full">X</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div> 
        </div>
	);
}

export default Login;


