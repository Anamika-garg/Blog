import React from 'react'

const Categories = () => {
  return (
    <>
    <div className="categories w-full min-h-[40px] flex items-center justify-center gap-[18px] flex-wrap">
        <button className='text-[15px] px-4 p-2 bg-black text-white'>All</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Technology</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Startup</button>
        <button className='text-[15px] px-4 p-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition-all'>Lifestyle</button>
    </div>
    </>
  )
}

export default Categories