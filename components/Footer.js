"use client"
import { useRouter } from 'next/navigation'

function Footer () {



return (
    <footer className="footer bg-base-100 text-white flex flex-row items-center h-14 justify-around mt-10">
    <aside className="btn btn-ghost items-center">
    <img className=" w-24" alt="logo" src="/experiencelogo.png" />
    </aside> 
    <div className='flex'>
        <a href='/'>Privacy</a>
        <a href='/'>Contact</a>
        <a href='/'>Terms</a>  
    </div>
    </footer>
)
}

export default Footer;