import React, { useState } from 'react'
import { POST_CATEGORIES } from '../../data'
import Catgory from './Catgory'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";


const Categories = () => {
  const [drop, setDrop] = useState(false);
  return (
    <>
    <div className="categories w-full min-h-[40px] flex items-center justify-center flex-col gap-[18px] flex-wrap">
      <h1 className="text-2xl font-bold mt-[20px] md:mt-0">Recent Blogs</h1>
      <div className={`flex items-center justify-center gap-[18px] transition-all flex-wrap overflow-hidden ${drop ? 'min-h-[40px]' : 'h-[40px]'}`}>
        {
          POST_CATEGORIES.map((e) => <Catgory Category={e}/>)
        }
        </div>
        {
          drop ? 
          <MdArrowDropUp className='lg:hidden h-[20px] w-[20px]' onClick={()=> setDrop(!drop)} /> : 
          <MdOutlineArrowDropDown className='lg:hidden h-[20px] w-[20px]' onClick={()=> setDrop(!drop)} />
        }
    </div>
    </>
  )
}

export default Categories