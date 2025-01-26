import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import SignUpWithGoogle from '../components/SignUpWithGoogle';


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function submitHandler(e) {
        e.preventDefault();
        const userData = new FormData();
        userData.append('email', formData.email);
        userData.append('password', formData.password);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/login`, userData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            // console.log(res.data.success);
            login(res.data.token , res.data.user)
            toast(res.data.success);
            setTimeout(()=>{
                navigate('/');
            },1500)
        }
        catch (err) {
            console.log(err)
            toast(err.response.data.error)
        }
    }
    return (
        <>
            <div className="con m-auto login-bg min-h-[100vh] w-[100vw] flex justify-center flex-col pb-5">
                <ToastContainer />
                <div className="con w-[80%] md:w-[70%] m-auto flex gap-[20px] flex-col">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Email : </label>
                        <input type="text" placeholder='Enter your email' className='p-3 border-2 w-[80%] relative h-[50px]' name='email' value={formData.email} onChange={changeHandler} />
                    </div>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Password : </label>
                        <input type="password" placeholder='Enter your Password' className='p-3 border-2 w-[80%] relative h-[50px]' name='password' value={formData.password} onChange={changeHandler} />
                    </div>
                    <div className="btn flex flex-wrap gap-[10px]">
                        <button className='bg-blue-400 font-semibold text-black w-[150px] px-4 py-1 rounded-md hover:bg-blue-500 transition-all' onClick={submitHandler}>Login</button>
                        <SignUpWithGoogle type={'login'} />
                    </div>
                    <small>Don't have an account? <Link to={'/signup'} className="text-blue-600">Sign Up</Link> here</small>
                </div>
            </div>
        </>
    )
}

export default Login