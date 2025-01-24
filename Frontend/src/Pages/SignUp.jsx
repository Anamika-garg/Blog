import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [formData , setFormData] = useState({
        fullName : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    async function submitHandler(e){
        e.preventDefault();
        const userData = new FormData();
        userData.append("fullName", formData.fullName);
        userData.append("email", formData.email);
        userData.append("password", formData.password);
        userData.append("confirmPassword", formData.confirmPassword);

        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/register` , userData);
            const data = await res.json()
            console.log(data)
        }
        catch(err){
            console.log(err);
        }
       
      
    }
  return (
    <>
    <div className="cont login-bg min-h-[100vh] w-[100vw] flex justify-center flex-col pb-5">
        <div className="con w-[80%] md:w-[70%] m-auto flex gap-[20px] flex-col">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <div className="input-fields flex items-center">
                <label htmlFor="email" className='w-[90px] relative font-semibold'>Full Name : </label>
                <input type="text" placeholder='Enter your Full Name' name='fullName' className='p-3 border-2 w-[80%] relative h-[50px]' value = {formData.fullName} onChange={(e) => setFormData({...formData , [e.target.name] : e.target.value})} />
            </div>
            <div className="input-fields flex items-center">
                <label htmlFor="email" className='w-[90px] relative font-semibold'>Email : </label>
                <input type="text" placeholder='Enter your email' name='email' className='p-3 border-2 w-[80%] relative h-[50px]' value = {formData.email} onChange={(e) => setFormData({...formData , [e.target.name] : e.target.value})} />
            </div>
            <div className="input-fields flex items-center">
                <label htmlFor="email" className='w-[90px] relative font-semibold'>Password : </label>
                <input type="password" placeholder='Enter your Password' name='password' className='p-3 border-2 w-[80%] relative h-[50px]' value = {formData.password} onChange={(e) => setFormData({...formData , [e.target.name] : e.target.value})} />
            </div>
            <div className="input-fields flex items-center">
                <label htmlFor="email" className='w-[90px] relative font-semibold'>Confirm Password : </label>
                <input type="password" placeholder='Confirm your Password' name='confirmPassword' className='p-3 border-2 w-[80%] relative h-[50px]' value = {formData.confirmPassword} onChange={(e) => setFormData({...formData , [e.target.name] : e.target.value})} />
            </div>
            <button className='bg-blue-400 font-semibold text-black w-[150px] px-4 py-2 rounded-md hover:bg-blue-500 transition-all' onClick={submitHandler}>Sign up</button>
            <small>Already have an account? <Link to={'/login'} className="text-blue-600">Login</Link> here</small>
        </div>
    </div>
</>
  )
}

export default SignUp