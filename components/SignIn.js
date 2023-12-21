"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

function SignIn() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

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
        if (!data.result) {
          setErrorMessage(
            "Your username or password doesn't match any account"
          );
          return;
        } else {
          dispatch(
            login({
              username: data.username,
              token: data.token,
              isCoach: data.isCoach,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          router.back();
        }
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    fetch("http://localhost:3000/emails/forgottenpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="flex flex-col grid justify-items-center">
      <div className="container">
        {/* opens the modal */}
        <Modal open={open}>
          <div>
            <div className="flex justify-end mb-6" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="mb-4">
              To change your password, we will send you a link by email.
            </p>
            <input
              className="bg-base-200 w-full h-10 rounded-md p-2 mb-6"
              type="text"
              placeholder="Email address linked to your account"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="modal-action">
            {/* closes the modal */}
            <button className="btn btn-primary" onClick={handleClose}>
              Send
            </button>
          </div>
        </Modal>
      </div>
      <h2 className="mb-8">Sign In</h2>
      <p className="mb-2">Username</p>
      <input
        className="bg-base-100 w-80 h-10 rounded-md p-2 mb-6"
        type="text"
        placeholder="Username"
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
      <div className="flex flex-row space-x-10 mb-10 cursor-pointer">
        <p onClick={handleOpen} className="underline">
          Forgot password?
        </p>
      </div>
      {errorMessage && <div className="text-red-500 mb-3">{errorMessage}</div>}
      <button
        className="bg-success w-80 h-10 rounded-md p-2 mb-6"
        id="signInButton"
        onClick={() => handleSignIn()}
      >
        Sign in
      </button>
      <a href="/signup">
        Don't have an account? Please <span className="underline">sign up</span>
        .
      </a>
    </div>
  );
}
export default SignIn;
