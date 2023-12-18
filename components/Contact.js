"use client"
import { useRouter } from 'next/navigation'

function Contact () {



return (
    <div className="flex flex-col items-center min-h-screen">
    <div className='w-5/6 flex-1'>
        <h1 className="text-xl mb-4">Contact us</h1>
        <p className="text-base mb-4">Please fill out this form and we will reply to you shortly.</p>
        <label className="form-control w-1/2 mb-4">
            <div className="label">
                <span className="label-text text-white mb-2">Name</span>
            </div>
            <input type="text" placeholder="Your name" className="input input-bordered" />
        </label>
        <label className="form-control lg:w-2/3 xl:w-2/3 w-full mb-4">
            <div className="label">
                <span className="label-text text-white mb-2">Email</span>
            </div>
            <input type="text" placeholder="Your email address" className="input input-bordered" />
        </label>
        <label className="form-control">
            <div className="label">
                <span className="label-text text-white mb-2">Message</span>
            </div>
            <textarea placeholder="How can we help?" className="textarea textarea-bordered textarea-lg h-56" ></textarea>
        </label>
        <div className='flex w-full justify-end mt-10'>
        <input type="submit" value="Submit" className="btn btn-success text-white" />
        </div>
    </div>
    </div>
)
}

export default Contact;