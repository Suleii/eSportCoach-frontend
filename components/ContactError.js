"use client"

function ContactError () {
return (
    <div className="flex flex-col items-center">
    <div className='w-5/6 flex-1'>
    <p className="text-xl mb-10">Error: your message has not been sent. </p>
    <p className="text-base"> Please try again later.</p>
    </div>
    </div>

)

}

export default ContactError;