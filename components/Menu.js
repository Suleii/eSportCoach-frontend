"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logout } from "@/reducers/user";
import {
  faHouse,
  faMagnifyingGlass,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
  }

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <div className="drawer z-10 w-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost justify-self-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-7 h-7 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-56 min-h-full bg-base-100 text-base-content text-white flex justify-between h-14 opacity-95">
          {/* Sidebar content here */}
          <div className="space-y-6 mt-14">
            <li onClick={() => navigate("/")}>
              <a className="text-white cursor-pointer">
                <FontAwesomeIcon icon={faHouse} /> Home
              </a>
            </li>
            <li onClick={() => navigate("/search")}>
              <a className="text-white cursor-pointer">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
              </a>
            </li>
            <li
              onClick={() =>
                navigate(
                  user.isCoach === false
                    ? `/gamer/${user.username}`
                    : `/coach/${user.username}`
                )
              }
            >
              <a className="text-white cursor-pointer">
                <FontAwesomeIcon icon={faGear} /> Settings
              </a>
            </li>
          </div>
          {user.token && (
            <div className="flex flex-row" onClick={handleLogout}>
              <li className="text-white mb-28 cursor-pointer">
                <FontAwesomeIcon
                  className="rotate-180"
                  icon={faRightFromBracket}
                />{" "}
                Logout
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
