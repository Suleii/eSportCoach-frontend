"use client";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'

function CoachSettings(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const [about, setAbout] = useState();
    const [experience, setExperience] = useState([])
    const [games, setGames] = useState([])
    const [twitch, setTwitch] = useState();
    const [instagram, setInstagram] = useState()
    const [youtube, setYoutube] = useState()
    const [discord, setDiscord] = useState()
    const [price, setPrice] = useState()
    
    const router = useRouter()
    const user = useSelector((state) => state.user.value);
    const fileInputRef = useRef();

  
   
    
// Fetch coach information when the component mounts
    useEffect(() => {
        if (user.token) {
      fetch(`http://localhost:3000/coaches/profile/${props.username}`)
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
              const twitch = data.profile.social.twitch;
              setTwitch(twitch);
              const instagram = data.profile.social.instagram;
              setInstagram(instagram);
              const youtube = data.profile.social.youtube;
              setYoutube(youtube);
              const discord = data.profile.social.discord;
              setDiscord(discord);
              const price = data.profile.price;
              setPrice(price);
                });
            } else {
                // Redirect to login page if not logged in
                //router.push('/login');
              }
            }, [user.token, user.username]);
 
 // Handle input changes and update the corresponding state variable
    const handleInputChange = (e) => {
         const { name, value } = e.target;
              
        // Define a mapping of input names to state update functions
        const fieldToStateMap = {
            lastname: setLastname,
            firstname: setFirstname,
            email: setEmail,
            photo: setPhoto,
            about: setAbout,
            experience: setExperience,
            games: setGames,
            twitch: setTwitch,
            instagram: setInstagram,
            youtube: setYoutube,
            discord: setDiscord,
            price: setPrice,
        };
              
        // Use the mapping to update the state based on the input name
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
            about,
            experience,
            games,
            social: {
                twitch,
                instagram,
                youtube,
                discord,
              },
            price,
        };
          
            fetch(`http://192.168.1.65:3000/coaches/profile/${props.username}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedCoachInfo),
            })
            .then((response) => {
              if (!response.ok) {
                console.error('Failed to update coach information');
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
      fetch(`http://localhost:3000/coaches/profile/${props.username}`)
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
                setTwitch(data.profile.social.twitch);
                setInstagram(data.profile.social.instagram);
                setYoutube(data.profile.social.youtube);
                setDiscord(data.profile.social.discord);
                setPrice(data.profile.price);
            });
        };
  
        const handleFileInputChange = (e) => {
          const file = e.target.files[0];
          setProfilePictureFile(file);
      };
  
      const handleUploadPictureClick = () => {
        fileInputRef.current.click(); // Trigger file input click when the picture is clicked
    };
  
    return (
    <div className="flex flex-col items-center min-h-screen mx-auto text-white w-5/6 flex-1 ">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className='flex flex col justify-between'>
            {/* Profile picture circle with the ability to upload */}
            <div className="relative">
                        <div
                            className="w-20 h-20 bg-base-200 rounded-full overflow-hidden cursor-pointer"
                            onClick={handleUploadPictureClick}
                        >
                            {/* Display the current profile picture */}
                            {photo ? (
            <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
            />
        ) : (
            <img
                src="./avatar.png"
                alt="Default Avatar"
                className="w-full h-full object-cover"
            />
        )}
                        </div>
                        {/* File input for uploading a new profile picture */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                    </div>
        <h2 className=''>Basic informations</h2>
        {!isEditing && (
            <button className='bg-accent w-20 h-8 rounded-xl' type="button" onClick={handleEditClick}>
              Edit
            </button>
          )}
          </div>
          {/* Input fields for coach information */}
        <div className='mt-6'>
          <label >
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5 "
              type="text" 
              placeholder="Last Name"
              value={lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              disabled={true}
            />
          </label>
  

          <h2 className='flex flex col mt-3 mb-8 '>Gaming informations</h2>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="About"
              value={about}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Experience"
              value={experience}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Games"
              value={games}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Twitch"
              value={twitch}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Youtube"
              value={youtube}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              type="text"
              placeholder="Discord"
              value={discord}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
  
          <label>
            <input className="bg-base-100 w-80 h-10 rounded-xl p-2 mb-5"
              placeholder="Price"
              value={price}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
        </div>
          <div className='flex justify-between mt-5'>
          {isEditing && (
            <>
              <button className='bg-success w-36 h-10 rounded-xl p-2 mb-6' type="button" onClick={handleSaveClick}>
                Save
              </button>
              <button className='bg-success w-36 h-10 rounded-xl p-2 mb-6' type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </>
          )}
          </div>
        </form>
    </div>
  
    );
  }

export default CoachSettings;
