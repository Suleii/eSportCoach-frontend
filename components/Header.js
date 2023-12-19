"use client";
import { useRouter } from "next/navigation";
import {useState,  useEffect} from 'react'
import { useSelector } from "react-redux";
import Menu from "../components/Menu";

function Header() {
  const user = useSelector((state) => state.user.value);
  const [profile, setProfile] = useState("")

  useEffect(() => {
    if(user.username !== null){
      if(user.isCoach){
        fetch(`http://localhost:3000/coaches/profile/${user.username}`)
        .then((response) => response.json())
        .then((data) => {
        setProfile(data.profile)});
      }else{
        fetch(`http://localhost:3000/gamers/profile/${user.username}`)
        .then(response => response.json())
        .then(data => {
        setProfile(data.profile); // to get the profile pic
        });
      };
      }      
  }, []);

  return (
    <div className="navbar pt-10 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        <Menu />
        <div>
          <a href="/" className="btn btn-ghost w-40">
            <img alt="logo" src="/experiencelogo.png" />
          </a>
        </div>
        <div className="flex-none">
          <div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user.username && user.isCoach === true ? (
                  <a href={`/coaches/${user.username}`}>
                    <img alt="Profile pic" src={profile.photo} />
                  </a>
                ) : user.username && user.isCoach === false ? (
                  <a href={`/gamer/${user.username}`}>
                    <img alt="Profile pic" src={profile.photo} />
                  </a>
                ) : (
                  <a href="/signin">
                    <img alt="Profile icon" src="/profilepic.png" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
