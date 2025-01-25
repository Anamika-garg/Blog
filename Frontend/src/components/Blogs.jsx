import React, { useEffect, useState } from 'react'
import BlogComp from './BlogComp'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Blogs = () => {
  const [posts , setPosts] = useState([]);
  useEffect(()=>{
    fetchPosts();
  },[])

  async function fetchPosts(){
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/getPosts`);
      // console.log(res);
      setPosts(res.data.Posts);
    }
    catch(err){
      console.log(err)
      toast.error('Error Fetching your Posts')
    }
  }
  return (
    <>
    <div className="container min-h-[60vh] w-[80vw] m-auto mt-[27px]"> 
      <ToastContainer/>
    <div className="container min-h-[60vh] w-[80vw] m-auto mt-[27px] flex items-center justify-center flex-wrap gap-[40px] pb-5"> 
        {
          posts ?  posts.map((e,i)=>{
            return <BlogComp key={i} blog={e}/>
          }) : <div>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path stroke="none" fill="#5b8ee1" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50">
                            <animateTransform values="0 50 51;360 50 51" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
                        </path><g></g></g></svg>
            </div>
        }
    </div>
    </div>
    </>
  )
}

export default Blogs