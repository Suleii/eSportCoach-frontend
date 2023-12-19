"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import styles from "../styles/Login.module.css";
//import { Modal } from 'antd';
// import SignUp from './SignUp';
// import SignIn from './SignIn';
// import Link from 'next/link';
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.username,
              token: data.token,
              isCoach: data.isCoach,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          router.push("/");
        }
      });
  };

  return (
    <div className="flex flex-col grid justify-items-center">
      <h2 className="mb-8">Sign In</h2>
      <p className="mb-2">Username</p>
      <input
        className="bg-base-100 w-80 h-10 rounded-md p-2 mb-6"
        type="text"
        placeholder="Gamer"
        id="signInUsername"
        onChange={(e) => setSignInUsername(e.target.value)}
        value={signInUsername}
      />
      <p className="mb-2 ">Password</p>
      <input
        className="bg-base-100 w-80 h-10 rounded-md p-2 mb-4"
        type="password"
        placeholder="Enter Your Password"
        id="signInPassword"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
      />
      <div className="flex flex-row space-x-10 mb-10">
        <div>
          <input type="checkbox" id="exampleUniq" className="bg-success" />
          <label htmlFor="exampleUniq">Remember me</label>
        </div>
        <p>Forgot password?</p>
      </div>
      <button
        className="bg-success w-80 h-10 rounded-md p-2 mb-6"
        id="signInButton"
        onClick={() => handleSignIn()}
      >
        Sign in
      </button>
      <a href="/signup">Don't have an account? Please sign up.</a>
      <p className="mb-4">or</p>
      <div className="flex flex-row ">
        <button className="bg-accent w-80 h-10 rounded-md p-2 mb-6">
          <img
            className="h-6 float-left"
            src="https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg"
          ></img>
          <p>Log in with Twitch</p>
        </button>
      </div>
    </div>
  );
}
export default SignIn;
