"use client"
import { useRouter } from 'next/navigation'

function Footer () {



return (
    <footer className="z bg-base-100 text-white flex flex-row items-center h-14 justify-between mt-10">
    <aside className="btn btn-ghost items-center">
    <img className=" w-24" alt="logo" src="/experiencelogo.png" />
    </aside> 
    <div className='flex row-end mr-10 space-x-8'>
        <a href='/privacy'>Privacy</a>
        <a href='/contact'>Contact</a>
        <a href='/terms'>Terms</a>  
    </div>
    </footer>
)
}

export default Footer;