import React from 'react'
import bg from '/1.jpg'
import author from '/author.jpg'
import { Link } from 'react-router-dom'

const BlogComp = () => {
    return (
        <>
            <div className="blog min-h-[350px] w-[350px] bg-white rounded-md overflow-hidden border-2 border-slate-300 cursor-pointer">
                <div className="img-con w-[100%] relative h-[200px] rounded-md">
                    <img src={bg} alt="" className='absolute h-[100%] w-[100%]'/>

                </div>
                <div className="content w-[100%] flex flex-col mt-[2px] gap-[3px] px-1">
                    <div className="upper-head flex justify-between">
                    <span className='ml-2 text-[15px] font-semibold px-2 py-1 text-white rounded-[6px] bg-black'>Lifestyle</span>
                    <span className='ml-2 text-[15px] font-semibold p-1 text-slate-500'>2 days ago</span>
                    </div>
                    <Link to={'/Blog'}>
                    <h1 className={`ml-2 text-xl font-semibold hover:underline transition-all`}>Lorem ipsum dolor sit amet consectetur.</h1>
                    <p className='ml-2 text-[14px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, sit....</p>
                    </Link>
                </div>
                <div className="author flex w-full relative h-[50px] gap-[6px] items-center">
                    <div className="image rounded-full h-[30px] w-[30px] ml-2">
                        <img src={author} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                    </div>
                    <div className="name">By: Anamika Garg</div>
                </div>
            </div>
        </>
    )
}

export default BlogComp