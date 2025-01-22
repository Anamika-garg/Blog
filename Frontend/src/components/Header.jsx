import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const [toggle , setToggle] = useState(true);
    return (
        <>
            <div className="header flex items-center justify-between h-[70px] fixed w-[100%] border-b-[1px] bg-white z-10">
                <div className="logo max-w-[50%] pl-20 md:relative h-[100%] flex md:items-center absolute top-5 md:left-0 md:top-0">
                    <Link to={'/'}>
                    <h1 className='text-2xl font-bold'>Blogger</h1>
                    </Link>
                </div>
                <div className="items md:w-[50%] md:h-[100%] flex justify-end md:gap-[50px] md:top-0 top-[10px] md:flex-row flex-col right-8 absolute w-[200px] md:justify-center md:items-center">
                    <div className={`hamburger transition-all w-[80%] p-3 flex items-center justify-end md:hidden`}>
                    <GiHamburgerMenu className='h-[35px] w-[35px] ' onClick={()=> setToggle(!toggle)}/>
                    </div>
                    <Link to={'/dashboard'}>
                    <button className={` ${toggle ? 'visible' : 'hidden'} md:visible text-[16px] border-b-[1px] border-blue-400 md:border-black md:hover:border-b-2 md:border-0 delay-0 bg-white hover:translate-x-1 transition-all w-[100%] p-3`}>Dashboard</button>
                    </Link>
                    <Link to={'/create'}>
                    <button className={` ${toggle ? 'visible' : 'hidden'} md:visible text-[16px] border-b-[1px] border-blue-400 md:border-black md:hover:border-b-2 md:border-0 delay-75 bg-white hover:translate-x-1 transition-all w-[100%] p-3`}>Create Post</button>
                    </Link>
                    <Link to={'/authors'}>
                    <button className={` ${toggle ? 'visible' : 'hidden'} md:visible text-[16px] border-b-[1px] border-blue-400 md:border-black md:hover:border-b-2 md:border-0 delay-100 bg-white hover:translate-x-1 transition-all w-[100%] p-3`}>Authors</button>
                    </Link>
                    <Link to={'/login'}>
                    <button className={` ${toggle ? 'visible' : 'hidden'} md:visible text-[16px] border-b-[1px] border-blue-400 md:border-black md:hover:border-b-2 md:border-0 delay-150 bg-white hover:translate-x-1 transition-all w-[100%] p-3`}>Login</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header