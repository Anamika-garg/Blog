import React from 'react'

const Newsletter = () => {
    return (
        <>
            <div className="container m-auto w-[80vw] min-h-[50vh] flex items-center justify-center flex-col gap-[26px]">
                <h1 className="text-4xl font-bold md:mt-8 mt-[80px] ">
                    Latest Blogs
                </h1>
                <p className='text-center'>Stay updated with the latest news, tips, and exclusive content delivered straight to your inbox.<br></br> Don't miss out!</p>
                <div className="take-input w-[50%] relative flex items-center justify-center min-h-[40px] flex-wrap">
                    <input type="text" placeholder='Enter Your Email Address' className='p-3 w-[400px] relative border-2 border-black'/>
                    <button className='p-3 w-[100px] bg-black text-white border-2 border-black mt-[9px] md:mt-[0]'>Subscribe</button>
                </div>
            </div>
        </>
    )
}

export default Newsletter