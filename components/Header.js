"use client"
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import Menu from '../components/Menu'

function Header () {

const user = useSelector((state) => state.user.value); 

return (
  
    <div className="navbar mb-10 justify-between">
        <Menu />
  <div>
    <a href="/" className="btn btn-ghost w-40">
        <img alt="logo" src="/experiencelogo.png" />
    </a>
  </div>
  <div className="flex-none mr-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        {
            user.username && user.isCoach===true? (
                <a href="/" >
                <img alt="Profile pic" src="" />
                </a>
        ) : user.username && user.isCoach===false? (
            <a href="/" >
            <img alt="Profile pic" src="" />
            </a>
        ) : (
            <a href="/login" >
            <img alt="Profile icon" src="/profilepic.png" />
            </a>
        )
        }  
        </div>
      </div>
    </div>
  </div>
</div>

)
}

export default Header;