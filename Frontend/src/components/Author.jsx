import React from 'react'
import author from '/author.jpg'
import { useNavigate } from 'react-router-dom';
const Author = ({author}) => {
  const navigate = useNavigate();
  const AuthorPosts = (e) =>{
    e.preventDefault();
    navigate('/posts' , {state : {name : `${author.fullName}` , id : author._id}})
  }
  return (
    <>
      <div className="author min-h-[90px] w-[280px] relative bg-white flex rounded-[10px] items-center gap-4 box-shadow p-4">
          <div className="image min-h-[90px] relative w-[100px] ml-2 rounded-md overflow-hidden">
            <img src={author.Avatar} alt="" className='relative h-[90px] w-[100%] rounded-md' />
          </div>
          <div className="info min-h-[90px] relative">
          <div className="name font-semibold">{author.fullName}</div>
          <div className=" name"> {author.NoOfPosts} Posts</div>
          <button className=" name bg-blue-600 font-semibold py-1 px-2 rounded-md mt-[10px] text-white hover:bg-blue-500 transition-all" onClick={AuthorPosts}> View Posts</button>
          </div>
      </div>
    </>
  )
}

export default Author