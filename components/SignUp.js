"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/navigation'



function SignUp(){

    const router = useRouter()

    const [signUpLastname, setSignUpLastname] = useState('');
	const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpMail, setSignUpMail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
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
    
              
                router.push('/quiz');
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


    return(
        <div className="flex flex-col space-y-4 grid justify-items-center ">
                               
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
                defaultValue={'question'}>
                <option disabled value="question">Choose :</option>
                <option value="Gamer">Gamer</option>
                <option value="Coach">Coach</option>
            </select>
            <a href='/signin'>Do you have an account? Please sign in.</a>
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
            >Sign up</button>
        </div>
    )
}

export default SignUp