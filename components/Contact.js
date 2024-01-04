"use client";
import Router from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Contact() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!userName || !userEmail || !subject || !msg) {
      setError("Missing field(s)");
    } else {
      fetch("https://experience-backend.vercel.app/emails/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          title: subject,
          message: msg,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            router.push("/contact/error");
          } else {
            console.log(data);
            setUserName("");
            setUserEmail("");
            setSubject("");
            setMsg("");

            router.push("/contact/confirmation");
          }
        });
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
  };

  const handleEmailChange = (e) => {
    const emailaddress = e.target.value;
    setUserEmail(emailaddress);
  };

  const handleSubjectChange = (e) => {
    const sub = e.target.value;
    setSubject(sub);
  };

  const handleMessageChange = (e) => {
    const mes = e.target.value;
    setMsg(mes);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-5/6 flex-1">
        <h1 className="text-xl mb-4">Contact us</h1>
        <p className="text-base mb-4">
          Please fill out this form and we will reply to you shortly.
        </p>
        <label className="form-control lg:w-2/3 xl:w-2/3 w-full mb-4">
          <div className="label">
            <span className="label-text text-white mb-2">Name</span>
          </div>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered"
            onChange={handleNameChange}
          />
        </label>
        <label className="form-control lg:w-2/3 xl:w-2/3 w-full mb-4">
          <div className="label">
            <span className="label-text text-white mb-2">Email</span>
          </div>
          <input
            type="text"
            placeholder="Your email address"
            className="input input-bordered"
            onChange={handleEmailChange}
          />
        </label>
        <label className="form-control lg:w-2/3 xl:w-2/3 w-full mb-4">
          <div className="label">
            <span className="label-text text-white mb-2">Subject</span>
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="input input-bordered"
            onChange={handleSubjectChange}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-white mb-2">Message</span>
          </div>
          <textarea
            placeholder="How can we help?"
            className="textarea textarea-bordered textarea-lg h-56"
            onChange={handleMessageChange}
          ></textarea>
        </label>

        <p className="mt-4 text-accent">{error}</p>
        <div className="flex w-full justify-end mt-10">
          <input
            type="submit"
            value="Submit"
            className="btn btn-success text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
