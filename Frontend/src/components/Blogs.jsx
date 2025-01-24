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
          }) : <div>Loading the Posts...</div>
        }
    </div>
    </div>
    </>
  )
}

export default Blogs