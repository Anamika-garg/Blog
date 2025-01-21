import React from 'react'
import BlogComp from './BlogComp'

const Blogs = () => {
  return (
    <>
    <div className="container min-h-[60vh] w-[80vw] m-auto mt-[27px] flex items-center justify-center flex-wrap gap-[40px]"> 
        <BlogComp/>
        <BlogComp/>
        <BlogComp/>
        <BlogComp/>
        <BlogComp/>
        <BlogComp/>
    </div>
    </>
  )
}

export default Blogs