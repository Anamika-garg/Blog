import React from 'react'

const Categories = () => {
  return (
    <>
    <div className="categories w-full h-[40px] flex items-center justify-center gap-[18px] flex-wrap">
        <button className='text-[15px] px-4 p-2 bg-black text-white'>All</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold'>Technology</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold'>Startup</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold'>Lifestyle</button>
    </div>
    </>
  )
}

export default Categories