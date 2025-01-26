import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import SignUpWithGoogle from '../components/SignUpWithGoogle';


const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function submitHandler(e) {
        e.preventDefault();
        const userData = new FormData();
        userData.append("fullName", formData.fullName);
        userData.append("email", formData.email);
        userData.append("password", formData.password);
        userData.append("confirmPassword", formData.confirmPassword);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/register`, userData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(res.data)
            toast(res.data.success);
            login(res.data.token, res.data.user)
            // toast(res.data.success);
            setTimeout(() => {
                navigate('/');
            }, 1500)
        }
        catch (err) {
            console.log(err);
            toast(err.response.data.error)
        }


    }


    return (
        <>
            <div className="cont login-bg min-h-[100vh] w-[100vw] flex justify-center flex-col pb-5">
                <div className="con w-[80%] md:w-[70%] m-auto flex gap-[20px] flex-col">
                    <ToastContainer />
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Full Name : </label>
                        <input type="text" placeholder='Enter your Full Name' name='fullName' className='p-3 border-2 w-[80%] relative h-[50px]' value={formData.fullName} onChange={changeHandler} />
                    </div>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Email : </label>
                        <input type="text" placeholder='Enter your email' name='email' className='p-3 border-2 w-[80%] relative h-[50px]' value={formData.email} onChange={changeHandler} />
                    </div>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Password : </label>
                        <input type="password" placeholder='Enter your Password' name='password' className='p-3 border-2 w-[80%] relative h-[50px]' value={formData.password} onChange={changeHandler} />
                    </div>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Confirm Password : </label>
                        <input type="password" placeholder='Confirm your Password' name='confirmPassword' className='p-3 border-2 w-[80%] relative h-[50px]' value={formData.confirmPassword} onChange={changeHandler} />
                    </div>
                    <div className="btn flex flex-wrap gap-[10px]">
                        <button className='bg-blue-400 font-semibold text-black w-[150px] px-4 py-1 rounded-md hover:bg-blue-500 transition-all' onClick={submitHandler}>Sign up</button>
                        <SignUpWithGoogle />
                    </div>
                    <small>Already have an account? <Link to={'/login'} className="text-blue-600">Login</Link> here</small>
                </div>
            </div>
        </>
    )
}

export default SignUp