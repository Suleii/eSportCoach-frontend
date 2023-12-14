"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';
import styles from '../styles/Login.module.css';
//import Link from 'next/link';
import { useRouter } from 'next/navigation'



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
                    router.push('/');
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
                    router.push('/');
				}
			});
	};


	return (
        <body className='h-screen flex flex-col'>
            <div className="flex flex-col  justify-center items-center text-center mx-auto text-white h-full ">
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
                                <input className="bg-base-100 w-64 h-10 rounded-md p-2"
                                    type="text" 
                                    placeholder="Last name" 
                                    id="signUpLastname" 
                                    onChange={(e) => setSignUpLastname(e.target.value)} 
                                    value={signUpLastname} 
                                />
                                <input className="bg-base-100 w-64 h-10 rounded-md p-2"
                                    type="text" 
                                    placeholder="First name" 
                                    id="signUpFirstname" 
                                    onChange={(e) => setSignUpFirstname(e.target.value)} 
                                    value={signUpFirstname} 
                                />
                                <input className="bg-base-100 w-64 h-10 rounded-md p-2"
                                    type="email" 
                                    placeholder="E-mail" 
                                    id="signUpMail" 
                                    onChange={(e) => setSignUpMail(e.target.value)} 
                                    value={signUpMail}
                                />
                                <input className="bg-base-100 w-64 h-10 rounded-md p-2"
                                    type="text" 
                                    placeholder="Username" 
                                    id="signUpUsername" 
                                    onChange={(e) => setSignUpUsername(e.target.value)} 
                                    value={signUpUsername} 
                                />
                                <input className="bg-base-100 w-64 h-10 rounded-md p-2"
                                    type="password" 
                                    placeholder="Password" 
                                    id="signUpPassword" 
                                    onChange={(e) => setSignUpPassword(e.target.value)} 
                                    value={signUpPassword} 
                                />
                                <select
                                    className="select select-bordered w-64 h-10 rounded-md "
                                    onChange={(e) => setSignUpCoach(e.target.value === 'Coach')}
                                    >
                                    <option disabled selected>Choose :</option>
                                    <option value="Gamer">Gamer</option>
                                    <option value="Coach">Coach</option>
                                </select>
                                <button className="text-white bg-success w-64 h-10 rounded-md" onClick={() => handleSignUp()}>Sign up and take the quiz</button>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="bg-success h-10 w-10 rounded-full mt-20">X</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                    <p className="{styles.textBottom}">Already have an account?</p>

                    {/* BOUTON SIGN IN */}
                    <button className="bg-success h-10 w-24 rounded-lg" onClick={()=>document.getElementById('my_modal_2').showModal()}>Sign In</button>
                    <dialog id="my_modal_2" className='modal'>
                        <div className="modal-box bg-bck-img ">
                            <div className="flex flex-col grid justify-items-center h-full ">
                                <img className={styles.logo} src="logoTwitter.png" alt="logo Twitter" />
                                <h2 className='mb-8'>Sign In</h2>
                                <p className='mb-2'>Email</p>
                                <input className='bg-base-100 w-80 h-10 rounded-md p-2 mb-6'
                                    type="text" 
                                    placeholder="example@gmail.com" 
                                    id="signInUsername" 
                                    onChange={(e) => setSignInUsername(e.target.value)} 
                                    value={signInUsername} 
                                />
                                <p className='mb-2 ' >Password</p>
                                <input className='bg-base-100 w-80 h-10 rounded-md p-2 mb-4'
                                    type="password" 
                                    placeholder="Enter Your Password" 
                                    id="signInPassword" 
                                    onChange={(e) => setSignInPassword(e.target.value)} 
                                    value={signInPassword} 
                                />
                                <div className='flex flex-row space-x-10 mb-10'>
                                    <div>
                                        <input type="checkbox" id="exampleUniq" className='bg-success'/>
                                        <label for="exampleUniq">Remember me</label>
                                    </div>
                                    <p>Forgot password?</p>
                                </div>
                                    <button className='bg-success w-80 h-10 rounded-md p-2 mb-6' id="signInButton" onClick={() => handleSignIn()}>Sign in</button>
                                    
                                        <p onClick={()=>document.getElementById('my_modal_1').showModal()} className='mb-4'>Don't have an account? Please sign up.</p>
                                    
                                    <p className='mb-4'>or</p>
                                    <div className='flex flex-row '>
                                        <button className='bg-accent w-80 h-10 rounded-md p-2 mb-6'>
                                        <img className='h-6 float-left' src='https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg'></img>
                                            <p>Log in with Twitch</p>
                                        </button>
                                    </div>
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
            
            <footer className="footer p-10 bg-base-100 text-white flex flex-row space-x-40 items-center  ">
                <aside>
                    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current items-center">
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    
                </aside> 
                <div className='flex flex-row'>
                    <p>Privacy</p> 
                    <p>Contact</p>
                    <p>Terms</p>
                </div>
                
            </footer>
            
        </body>    
	);
}

export default Login;


