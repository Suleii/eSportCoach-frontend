"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Login.module.css';
//import { Modal } from 'antd';
// import SignUp from './SignUp';
// import SignIn from './SignIn';
import Link from 'next/link';
import { useRouter } from 'next/navigation'




function Login() {

    const router = useRouter()

    const [signUpLastname, setSignUpLastname] = useState('');
	const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpMail, setSignUpMail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
	const [signUpCoach, setSignUpCoach] = useState("");
    const [message, setMessage] = useState('')
    

    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


    const handleSignUpGamer = () => {
        fetch('http://localhost:3000/users/signup/gamer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lastname: signUpLastname,
                firstname: signUpFirstname,
                username: signUpUsername,
                email: signUpMail,
                password: signUpPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
              
                dispatch(login({
                    lastname: signUpLastname,
                    firstname: signUpFirstname,
                    username: signUpUsername,
                    email: signUpMail,
                    token: data.token,
                    isCoach: false
                }));
    
                
                setSignUpLastname('');
                setSignUpFirstname('');
                setSignUpUsername('');
                setSignUpMail('');
                setSignUpPassword('');
                setSignUpCoach('')
    
              
                router.push('/');
            } else {
                console.log(data.error);
                setMessage(data.error)
            }
        })
    }
    
    const handleSignUpCoach = () => {
        fetch('http://localhost:3000/users/signup/coach', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lastname: signUpLastname,
                firstname: signUpFirstname,
                username: signUpUsername,
                email: signUpMail,
                password: signUpPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
              
                dispatch(login({
                    lastname: signUpLastname,
                    firstname: signUpFirstname,
                    username: signUpUsername,
                    email: signUpMail,
                    token: data.token,
                    isCoach: true,
                }));
    
                
                setSignUpLastname('');
                setSignUpFirstname('');
                setSignUpUsername('');
                setSignUpMail('');
                setSignUpPassword('');
                setSignUpCoach('')
    
              
                router.push('/');
            } else {
                console.log(data.error);
                setMessage(data.error)
            }
        })
    }

    const handleSignIn = () => {
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: data.username, token: data.token , isCoach: data.isCoach}));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/');
				}
			});
	};


	return (
        <div className='h-screen flex flex-col'>
            <div className="flex flex-col  text-center mx-auto text-white h-full ">
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
                                    onChange={(e) => setSignUpCoach(e.target.value)}
                                    >
                                    <option disabled selected>Choose :</option>
                                    <option value="Gamer">Gamer</option>
                                    <option value="Coach">Coach</option>
                                </select>
                                {message !==''
                                    ?<div  className="w-80 mb-2 mx-auto flex align-center ">
                                            <span className="text-xs text-accent ">{message}</span>
                                        </div>
                                    : ""
                                    } 
                                <button className="text-white bg-success w-64 h-10 rounded-md" 
                                onClick={() => {signUpCoach === ''
                                                        ? setMessage("Sign up as a gamer or a coach")
                                                        : signUpCoach === 'Gamer'
                                                        ? handleSignUpGamer()
                                                        : handleSignUpCoach()}}
                                >Sign up and take the quiz</button>
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
        </div>    
	);
}

export default Login;


