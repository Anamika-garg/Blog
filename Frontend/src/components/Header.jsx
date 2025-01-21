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
                    <Link to={'/dashboard'}>
                    <button className='text-[16px] hover:border-b-2 border-black transition-all'>Dashboard</button>
                    </Link>
                    <Link to={'/create'}>
                    <button className='text-[16px] hover:border-b-2 border-black transition-all'>Create Post</button>
                    </Link>
                    <Link to={'/authors'}>
                    <button className='text-[16px] hover:border-b-2 border-black transition-all'>Authors</button>
                    </Link>
                    <Link to={'/login'}>
                    <button className='text-[16px] hover:border-b-2 border-black transition-all'>Login</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header