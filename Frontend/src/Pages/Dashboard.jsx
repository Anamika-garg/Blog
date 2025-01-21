import React from 'react'
import author from '/author.jpg'
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
    <div className="container min-h-[100vh] flex-col items-center w-[100vw] gap-[18px] flex">
        <div className="profile h-[300px] w-[300px] bg-yellow-500 border-[14px] border-blue-400 rounded-full overflow-hidden mt-[100px]">
            <img src={author} alt="" className='h-[100%] w-[100%] rounded-full' />
        </div>
            <FaEdit className='h-[50px] w-[50px] rounded-full relative top-[-70px] right-[-80px]'/>
            <h1 className="text-[16px] text-white font-semibold p-2 bg-blue-500 rounded-md top-[-70px] relative">My Posts</h1>
        <input type="text" placeholder='Your Full Name' value={'Anamika Garg'} className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2'/>
        <input type="text" placeholder='Your Current email' value={'avcd@gmail.com'} className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2'/>
        <input type="text" placeholder='Current Password'  className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2'/>
        <input type="text" placeholder='New Password' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2'/>
        <input type="text" placeholder='Confirm new password' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2'/>
        <button className='top-[-70px] relative bg-blue-600 p-2 px-4 rounded-md text-white'>Update Profile</button>
    </div>
    </>
  )
}

export default Dashboard