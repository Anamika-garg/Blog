import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className="container login-bg min-h-[100vh] w-[100vw] flex justify-center flex-col">
                <div className="con w-[80%] md:w-[70%] m-auto flex gap-[20px] flex-col">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Email : </label>
                        <input type="text" placeholder='Enter your email' className='p-3 border-2 w-[80%] relative h-[50px]' />
                    </div>
                    <div className="input-fields flex items-center">
                        <label htmlFor="email" className='w-[90px] relative font-semibold'>Password : </label>
                        <input type="password" placeholder='Enter your Password' className='p-3 border-2 w-[80%] relative h-[50px]' />
                    </div>
                    <button className='bg-blue-400 font-semibold text-black w-[150px] px-4 py-2 rounded-md'>Login</button>
                    <small>Don't have an account? <Link to={'/signup'} className="text-blue-600">Sign Up</Link> here</small>
                </div>
            </div>
        </>
    )
}

export default Login