"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

function Review(props) {
  const [open, setOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [note, setNote] = useState(0);
  const [myreview, setMyReview] = useState("");
  const user = useSelector((state) => state.user.value);

  //COACH PROFILE STARS
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < props.rating) {
      style = { color: "#599c5f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  //MODAL FOR GAMER PROFILE
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const openModal = () => {
    setOpen(true);
    setSelectedCoach(props.coach);
    console.log("selectedcoach", selectedCoach);
  };

  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { cursor: "pointer" };
    if (i < note) {
      style = { color: "#599c5f", cursor: "pointer" };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => setNote(i + 1)}
        style={style}
        className="note"
      />
    );
  }

  //SEND REVIEW TO DB
  const handleSubmit = () => {
    setOpen(false);
    setOpen(false);

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game: props.game,
        username: user.username,
        coachUsername: props.coach,
        content: myreview,
        rating: note,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });
  };

  const handleInputChange = (e) => {
    const msg = e.target.value;
    setMyReview(msg);
  };

  console.log(myreview);

  return (
    <>
      <div className="container">
        {/* opens the review modal */}
        <Modal open={open} onClose={() => handleClose()}>
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

          <label className="form-control ">
            <div className="label flex">
              <span className="text-lg text-white">
                Your review for @{selectedCoach}
              </span>
              <div> {personalStars}</div>
            </div>

            <textarea
              minLength="10"
              maxLength="120"
              required
              placeholder="Tell us what you think"
              onChange={handleInputChange}
              className="textarea bg-neutral textarea-bordered textarea-lg text-primary h-56"
            ></textarea>
          </label>

          <div className="modal-action">
            {/* closes the modal */}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Modal>
      </div>
      {props.coach ? (
        <div role="alert" className=" flex flex-row justify-between w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between mb-2">
              <div className="avatar items-center ">
                <div className="w-10 h-10 rounded-full mr-4">
                  <img src={props.photo} alt="Profile pic" />
                </div>
                <span className="text-sm">@{props.coach}</span>
              </div>

              <span className="text-xs">{stars}</span>
            </div>
            {props.content ? (
              <div className="text-xs mb-2">{props.content}</div>
            ) : (
              <p>
                No review for this coach yet.&nbsp;{" "}
                <span
                  className="underline underline-offset-4 decoration-info"
                  onClick={openModal}
                >
                  Do it now!
                </span>
              </p>
            )}
            <div className="badge badge-accent text-xs">{props.game}</div>
            <div className="divider divider-neutral h-0.5 mb-3"></div>
          </div>
        </div>
      ) : (
        <div role="alert" className=" flex flex-row justify-between w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between mb-2">
              <div className="avatar items-center ">
                <div className="w-10 h-10 rounded-full mr-4">
                  <img src={props.photo} alt="Profile pic" />
                </div>
                <span className="text-sm">@{props.username}</span>
              </div>

              <span className="text-xs">{stars}</span>
            </div>
            <div className="text-xs mb-2">{props.content}</div>
            <div className="badge badge-accent text-xs">{props.game}</div>
            <div className="divider divider-neutral h-0.5 mb-3"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Review;
