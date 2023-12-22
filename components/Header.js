"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";

function Header() {
  const user = useSelector((state) => state.user.value);

  
  return (
    <div className="navbar pt-8 mb-6">
      <div className="container mx-4 flex justify-between items-center">
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
              <div className="w-10 rounded-full bg-base-200">
                {user.username && user.isCoach === true ? (
                  <a href={`/coaches/${user.username}`}>
                    <img alt="Profile pic" src={user.photo} />
                  </a>
                ) : user.username && user.isCoach === false ? (
                  <a href={`/gamer/${user.username}`}>
                    <img alt="Profile pic" src={user.photo} />
                  </a>
                ) : (
                  <a href="/signin">
                    <img alt="Profile icon" src="/profilepicLogin.png" />
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
