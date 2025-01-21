import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="header flex items-center justify-center min-h-[70px] fixed w-[100%] border-b-[1px] bg-white z-10">
                <div className="logo w-[30%] relative h-[100%]">
                    <Link to={'/'}>
                    <h1 className='text-2xl font-bold'>Blogger</h1>
                    </Link>
                </div>
                <div className="items w-[50%] relative h-[100%] flex justify-end gap-[50px]">
                    <button className='text-xl'>Authors</button>
                    <button className='text-xl'>Login</button>
                </div>
            </div>
        </>
    )
}

export default Header