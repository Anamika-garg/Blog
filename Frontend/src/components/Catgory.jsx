import React from 'react'

const Catgory = ({Category ,setCategory}) => {
  return (
    <>
    <button className='text-[15px] px-4 p-2 bg-white rounded-md text-black font-semibold hover:bg-black hover:text-white transition-all' onClick={() => setCategory(Category)}>{Category}</button>
    </>
  )
}

export default Catgory