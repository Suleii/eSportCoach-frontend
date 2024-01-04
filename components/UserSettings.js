"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { avatar } from "../reducers/user";

function UserSettings(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const fileInputRef = useRef();

  // Fetch coach information when the component mounts
  useEffect(() => {
    fetch(`https://experience-backend.vercel.app
/users/credentials/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        if (user.token === data.credentials.token) {
          fetch(`https://experience-backend.vercel.app
/gamers/profile/${props.username}`)
            .then((response) => response.json())
            .then((data) => {
              const lastname = data.profile.lastname;
              setLastname(lastname);
              const firstname = data.profile.firstname;
              setFirstname(firstname);
              const email = data.profile.email;
              setEmail(email);
              const photo = data.profile.photo;
              setPhoto(photo);
            });
        } else {
          // Redirect to home page if not correct user
          router.push("/");
        }
      });
  }, [user.token, user.username, user.avatar]);

  // Handle input changes and update the corresponding state variable
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For other fields, update the state based on the input name
    const fieldToStateMap = {
      lastname: setLastname,
      firstname: setFirstname,
      email: setEmail,
      photo: setPhoto,
    };

    const setStateFunction = fieldToStateMap[name];
    if (setStateFunction) {
      setStateFunction(value);
    }
  };

  // Function to update coach information on the server
  const updateCoachInfo = () => {
    const updatedCoachInfo = {
      lastname,
      firstname,
      email,
      photo,
    };

    fetch(
      `https://experience-backend.vercel.app
/gamers/profile/${props.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCoachInfo),
      }
    ).then((response) => {
      if (!response.ok) {
        console.error("Failed to update gamer information");
      }
    });
  };

  // Form submission and update coach information
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoachInfo();
  };

  // Save button, disable editing mode, and update coach information
  const handleSaveClick = () => {
    setIsEditing(false);
    updateCoachInfo();
  };

  // Enable editing mode when the edit button is clicked
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Cancel button, disable editing mode, and reset the form to the original state
  const handleCancelClick = () => {
    setIsEditing(false);
    fetch(`https://experience-backend.vercel.app
/gamers/profile/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the state variables back to their original values
        setLastname(data.profile.lastname);
        setFirstname(data.profile.firstname);
        setEmail(data.profile.email);
        setPhoto(data.profile.photo);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    handleUploadPicture(file);
  };

  const handleUploadPicture = async (file) => {
    const formData = new FormData();
    formData.append("photoFromFront", file);

    fetch(
      `https://experience-backend.vercel.app
/gamers/profile/${props.username}/photo`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          console.error("Failed to update gamer photo");
        } else {
          dispatch(avatar(data.profile));
        }
      });
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div className="w-5/6 flex-1 ">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex col justify-center mb-8 w-full ">
            {/* Profile picture to upload */}
            <div
              className="w-28 h-28 bg-base-200  rounded-full"
              // Trigger file input  when the picture is clicked
              onClick={() => fileInputRef.current.click()}
            >
              {/*Display the current profile picture */}

              <img
                src={user.photo}
                alt="Profile"
                className="rounded-full w-28 h-28"
              />

              {/* Overlay image */}
              <img
                src="/edit.png"
                alt="edit"
                className="w-10 h-10 flex ml-16 -mt-8"
              />

              {/* File input for uploading a new profile picture */}

              <label className="file-input-label"></label>
              <input
                type="file"
                accept="image/*"
                name="photo"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 mb-6">
            <h2>Basic information</h2>
            {!isEditing && (
              <button
                className="bg-accent w-20 h-8 rounded-xl"
                type="button"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
          {/* Input fields for coach information */}
          <div className="mt-6 ">
            <label>
              <input
                className="bg-base-100 w-full  rounded-xl p-2 mb-5 "
                type="text"
                placeholder="Last Name"
                value={lastname}
                name="lastname"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full  rounded-xl p-2 mb-5"
                type="text"
                placeholder="First Name"
                value={firstname}
                name="firstname"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full  rounded-xl p-2 mb-5"
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleInputChange}
                disabled={isEditing}
              />
            </label>
          </div>
          <div className="flex justify-between mt-5">
            {isEditing && (
              <>
                <button
                  className="bg-primary-content w-36  rounded-xl p-2 mb-6"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-success w-36 rounded-xl p-2 mb-6"
                  type="button"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
