"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { avatar } from "../reducers/user";

function CoachSettings(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState([]);
  const [experienceInput, setExperienceInput] = useState("");
  const [games, setGames] = useState([]);
  const [gameInput, setGameInput] = useState("");
  const [twitch, setTwitch] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [discord, setDiscord] = useState("");
  const [price, setPrice] = useState(0);
  const [language, setLanguage] = useState([]);
  const [languageInput, setLanguageInput] = useState("");

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
/coaches/profile/${props.username}`)
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
              const about = data.profile.about;
              setAbout(about);
              const experience = data.profile.experience;
              setExperience(experience);
              const games = data.profile.games;
              setGames(games);
              const twitch = data.profile.socials.twitch;
              setTwitch(twitch);
              const instagram = data.profile.socials.instagram;
              setInstagram(instagram);
              const youtube = data.profile.socials.youtube;
              setYoutube(youtube);
              const discord = data.profile.socials.discord;
              setDiscord(discord);
              const price = data.profile.price;
              setPrice(price);
              const language = data.profile.language;
              setLanguage(language);
            });
        } else {
          // Redirect to home page if not correct user
          router.push("/");
        }
      });
  }, [user.token, user.username, user.photo]);

  // Handle input changes and update the corresponding state variable
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For other fields, update the state based on the input name
    const fieldToStateMap = {
      lastname: setLastname,
      firstname: setFirstname,
      email: setEmail,
      photo: setPhoto,
      about: setAbout,
      twitch: setTwitch,
      instagram: setInstagram,
      youtube: setYoutube,
      discord: setDiscord,
      price: setPrice,
      language: setLanguageInput,
      games: setGameInput,
      experience: setExperienceInput,
    };

    const setStateFunction = fieldToStateMap[name];
    if (setStateFunction) {
      setStateFunction(value);
    }
  };

  // Add and remove games
  const addGame = () => {
    if (gameInput.trim() !== "" && !games.includes(gameInput)) {
      let newGamesArray = [...games, gameInput];
      setGames(newGamesArray);
      setGameInput("");
    }
  };

  const removeGame = (index) => {
    const updatedGames = [...games];
    updatedGames.splice(index, 1);
    setGames(updatedGames);
  };

  // Add and remove languages
  const addLanguage = () => {
    if (languageInput.trim() !== "" && !language.includes(languageInput)) {
      let newLanguageArray = [...language, languageInput];
      setLanguage(newLanguageArray);
      setLanguageInput("");
    }
  };

  const removeLanguage = (index) => {
    const updatedLanguage = [...language];
    updatedLanguage.splice(index, 1);
    setLanguage(updatedLanguage);
  };

  // Add and remove experiences
  const addExperience = () => {
    if (
      experienceInput.trim() !== "" &&
      !experience.includes(experienceInput)
    ) {
      let newExperienceArray = [...experience, experienceInput];
      setExperience(newExperienceArray);
      setExperienceInput("");
    }
  };

  const removeExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  // Function to update coach information on the server
  const updateCoachInfo = () => {
    const updatedCoachInfo = {
      lastname,
      firstname,
      email,
      photo,
      about,
      experience,
      twitch,
      instagram,
      youtube,
      discord,
      price,
      games,
      language,
    };
    console.log("update", updatedCoachInfo);

    fetch(
      `https://experience-backend.vercel.app
/coaches/profile/${props.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCoachInfo),
      }
    ).then((response) => {
      if (!response.ok) {
        console.error("Failed to update coach information");
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
/coaches/profile/${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the state variables back to their original values
        setLastname(data.profile.lastname);
        setFirstname(data.profile.firstname);
        setEmail(data.profile.email);
        setPhoto(data.profile.photo);
        setAbout(data.profile.about);
        setExperience(data.profile.experience);
        setGames(data.profile.games);
        setTwitch(data.profile.socials.twitch);
        setInstagram(data.profile.socials.instagram);
        setYoutube(data.profile.socials.youtube);
        setDiscord(data.profile.socials.discord);
        setPrice(data.profile.price);
        setLanguage(data.profile.language);
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
/coaches/profile/${props.username}/photo`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Uploaded picture data:", data);
        if (!data.result) {
          console.error("Failed to update coach photo");
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

              {/* Edit pencil */}
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

            <label>
              <div className="flex mb-2 w-full">
                <input
                  className="bg-base-100 w-72 rounded-xl p-2"
                  type="text"
                  placeholder="Languages"
                  value={languageInput}
                  name="language"
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <button
                  className="bg-success rounded-xl p-2  ml-2"
                  type="button"
                  onClick={addLanguage}
                  disabled={!isEditing}
                >
                  Add
                </button>
              </div>

              {/* Display the list of languages with delete option */}
              <div className="flex flex-wrap mb-2">
                {language.map((language, index) => (
                  <div
                    key={index}
                    className="bg-base-100  h-8 rounded-xl p-2 m-1 flex items-center justify-center"
                  >
                    <span className="mr-2">{language}</span>
                    <button
                      className="text-danger"
                      type="button"
                      onClick={() => removeLanguage(index)}
                      disabled={!isEditing}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </label>

            <h2 className="flex flex col mt-3 mb-6 ">Gaming information</h2>

            <label>
              <input
                className="bg-base-100 w-full rounded-xl p-2 mb-5"
                type="text"
                placeholder="About"
                value={about}
                name="about"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <div className="flex mb-2 w-full">
                <input
                  className="bg-base-100 w-72 rounded-xl p-2"
                  type="text"
                  placeholder="Experiences"
                  value={experienceInput}
                  name="experience"
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <button
                  className="bg-success rounded-xl p-2  ml-2"
                  type="button"
                  onClick={addExperience}
                  disabled={!isEditing}
                >
                  Add
                </button>
              </div>

              {/* Display the list of games with delete option */}
              <div className="flex flex-wrap mb-2">
                {experience.map((experience, index) => (
                  <div
                    key={index}
                    className="bg-base-100  h-8 rounded-xl p-2 m-1 flex items-center justify-center"
                  >
                    <span className="mr-2">{experience}</span>
                    <button
                      className="text-danger"
                      type="button"
                      onClick={() => removeExperience(index)}
                      disabled={!isEditing}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </label>

            <label>
              <div className="flex mb-2 w-full">
                <input
                  className="bg-base-100 w-72 rounded-xl p-2"
                  type="text"
                  placeholder="Games"
                  value={gameInput}
                  name="games"
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <button
                  className="bg-success rounded-xl p-2  ml-2"
                  type="button"
                  onClick={addGame}
                  disabled={!isEditing}
                >
                  Add
                </button>
              </div>

              {/* Display the list of games with delete option */}
              <div className="flex flex-wrap mb-2">
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="bg-accent  h-8 rounded-xl p-2 m-1 flex items-center justify-center"
                  >
                    <span className="mr-2">{game}</span>
                    <button
                      className="text-danger"
                      type="button"
                      onClick={() => removeGame(index)}
                      disabled={!isEditing}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </label>

            <label>
              <input
                className="bg-base-100 w-full  rounded-xl p-2 mb-5"
                type="text"
                placeholder="Twitch"
                name="twitch"
                value={twitch}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full rounded-xl p-2 mb-5"
                type="text"
                placeholder="Instagram"
                value={instagram}
                name="instagram"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full rounded-xl p-2 mb-5"
                type="text"
                placeholder="Youtube"
                value={youtube}
                name="youtube"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full rounded-xl p-2 mb-5"
                type="text"
                placeholder="Discord"
                value={discord}
                name="discord"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              <input
                className="bg-base-100 w-full rounded-xl p-2 mb-5"
                placeholder="Price"
                value={price}
                name="price"
                onChange={handleInputChange}
                disabled={!isEditing}
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

export default CoachSettings;
