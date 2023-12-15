"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import { faBars, faHouse, faMagnifyingGlass, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


function Menu () {

    function handleLogout() {
        dispatch(logout())
        window.location.assign("./")
      }

    return(
        <div className="drawer z-10 w-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost justify-self-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-56 min-h-full bg-base-100 text-base-content text-white flex justify-between h-14 opacity-95">
                {/* Sidebar content here */}
                <div className='space-y-6 mt-14'>
                    <li className='text-white'><a href='/'> <FontAwesomeIcon icon={faHouse} />Home</a></li>
                    <li className='text-white'><a href='/search'><FontAwesomeIcon icon={faMagnifyingGlass} />Search</a></li>
                    {/* <li className='text-white'><a href='/'>My Profile</a></li> */}
                    <li className='text-white'><a href='/settings'><FontAwesomeIcon icon={faGear} />Settings</a></li>
                </div>
                <div className=''>
                    <li className='text-white mb-28' onClick={() => handleLogout()}><a href='/login'><FontAwesomeIcon className='rotate-180' icon={faRightFromBracket} />Logout</a></li>
                </div>
                </ul>
            </div>
        </div>

    )
}

export default Menu;




