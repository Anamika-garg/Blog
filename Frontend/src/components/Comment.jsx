import React from 'react'
import author from '/author.jpg'

const Comment = () => {
    return (
        <>
            <div className="comment-con py-4 my-2 container h-[50px] lg:w-[50%] flex items-center gap-[10px]">
                <div className="image rounded-full h-[40px] w-[40px]">
                    <img src={author} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                </div>
                <div className="content flex flex-col">
                    <div className="cred flex items-center gap-[6px]">
                        <h1 className='text-[17px] font-semibold'>Anmol</h1>
                        <small>(1 hour ago)</small>
                    </div>
                    <div className="comment">Such an Amazing Blog! Love it</div>
                </div>
            </div>
        </>
    )
}

export default Comment