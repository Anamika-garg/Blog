import React from 'react'

const Categories = () => {
  return (
    <>
    <div className="categories w-full min-h-[40px] flex items-center justify-center flex-col gap-[18px] flex-wrap">
      <h1 className="text-2xl font-bold mt-[20px] md:mt-0">Recent Blogs</h1>
      <div className='flex items-center justify-center gap-[18px] flex-wrap'>
        <button className='text-[15px] px-4 p-2 bg-black text-white'>All</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Technology</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Startup</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Lifestyle</button>
        </div>
    </div>
    </>
  )
}

export default Categories