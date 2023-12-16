"use client"
import React from 'react';
import { useEffect, useState } from 'react';

const Quiz = () => {
const [games, setGames] = useState([])
const [proCoach, setproCoach] = useState("");

  

useEffect(() => {
    fetch(`http://localhost:3000/coaches/games`)
    .then(response => response.json())
    .then(data => {
    let gamesData=data.availableGames;
    setGames(gamesData);
    });
  }, [])

const gamesList = games.map((data, i) =>
  <option className='hover:bg-base-100 focus:bg-base-100 w-100' key={i} value={data}>{data}</option>
  )

const handleGameSelection = (event) => {
    setGameSelected(event.target.value);
};

const handleTypeOfCoach = (value) => {
    setproCoach(value);}

    console.log(proCoach)

    
  return (
    <div className="flex flex-col items-center min-h-screen">
        <div className='w-5/6 flex-1'>
            <select
                className="select select-bordered w-full rounded-md mb-10 flex"
                onChange={handleGameSelection}>
                <option className='btn m-1 w-full' disabled defaultValue >What game do you need a coach for?</option>
                {games.length>0 
                ?(gamesList)
                : <option className='btn m-1 w-full' value="" disabled >No games in our database</option>
                }
            </select>
            <div className='bg-base-100 rounded-md mb-10 p-4'>
                <p className='mb-2'>Do you want to play with a pro player?</p>
                <div className="flex " >
                {/* first radio button */}
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-info before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-success checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-success checked:after:bg-success checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-success checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-info-600 dark:checked:border-success dark:checked:after:border-success dark:checked:after:bg-success dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-success dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="Yes" 
                    onChange={(e)=>{handleTypeOfCoach(e.target.value)}}/>
                    <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                    
                    >Yes</label>
                </div>

                {/* second radio */}
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-info before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-success checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-success checked:after:bg-success checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-success checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-info-600 dark:checked:border-success dark:checked:after:border-success dark:checked:after:bg-success dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-success dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="No" 
                    onChange={(e)=>{handleTypeOfCoach(e.target.value)}}/>
                    <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                    >No</label>
                </div>

                {/* Third radio */}
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-info before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-success checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-success checked:after:bg-success checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-success checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-info-600 dark:checked:border-success dark:checked:after:border-success dark:checked:after:bg-success dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-success dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="Any" 
                    onChange={(e)=>{handleTypeOfCoach(e.target.value)}}/>
                    <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                    >Any</label>
                </div>
                </div>
            
            </div>
            <div className="form-control bg-base-100 rounded-md p-4 flex items-start mb-2">
                <p>Why do you need a coach?</p>
               {/* checkbox */}
            </div>
        </div>
    </div>
  );
};

export default Quiz;