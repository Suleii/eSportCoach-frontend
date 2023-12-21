"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react";


function ResetPassword (props) {
const router = useRouter();

const [password, setPassword] = useState("");

const handleSubmit = () => {
    fetch("http://localhost:3000/users/updatepassword", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: props.username , token: props.token, newpassword: password}),
      })
    .then(response => response.json())
    .then(data => console.log(data))

    router.push('/signin')
}

return (
    <div className="flex flex-col items-center ">
    <div className='w-5/6 flex-1'>
    
        <p className="mb-4">Please choose a new password.</p>
              <input
            className="bg-base-200 w-full h-10 rounded-md p-2 mb-6"
            type="password"
            placeholder="New password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        <div className='flex justify-end'>
          <button className="btn btn-success" onClick={handleSubmit}>
                Submit
          </button>
        </div>
    </div>
    </div>
)
}

export default ResetPassword;