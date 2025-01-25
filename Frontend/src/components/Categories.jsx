import React, { useEffect, useState } from 'react'
import { POST_CATEGORIES } from '../../data'
import Catgory from './Catgory'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import axios from 'axios';
import BlogComp from './BlogComp'
import { toast, ToastContainer } from 'react-toastify';


const Categories = () => {
  const [drop, setDrop] = useState(false);
  const [category, setCategory] = useState('All');
  const [error ,setError] = useState('');


  const [posts , setPosts] = useState([]);
  useEffect(()=>{
    fetchPosts();
  },[category])

  async function fetchPosts(){
    setError('')
    try{
      if(category == 'All'){
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/getPosts`);
        // console.log(res);
        setPosts(res.data.Posts);
      }
      else{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/category/${category}`);
        // console.log(res.data)
        setPosts(res.data.Posts);
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.response.data.error);
      // setPosts([]);
      if(err.response.data.status == 404){
        setError('No Posts');
      }
    }
  }

  return (
    <>
      <div className="categories w-full min-h-[40px] flex items-center justify-center flex-col gap-[18px] flex-wrap">
        <ToastContainer />
        <h1 className="text-2xl font-bold mt-[20px] md:mt-0">Recent Blogs ({category})</h1>
        <div className={`flex items-center justify-center gap-[18px] transition-all flex-wrap overflow-hidden ${drop ? 'min-h-[40px]' : 'h-[40px]'}`}>
          
          {/* {console.log(error)} */}
          {
            POST_CATEGORIES.map((e, i) => <Catgory Category={e} key={i} setCategory={setCategory} />)
          }
        </div>
        {
          drop ?
            <MdArrowDropUp className='lg:hidden h-[20px] w-[20px]' onClick={() => setDrop(!drop)} /> :
            <MdOutlineArrowDropDown className='lg:hidden h-[20px] w-[20px]' onClick={() => setDrop(!drop)} />
        }
      </div>
      <div className="container min-h-[30vh] w-[80vw] m-auto mt-[27px]">
        <ToastContainer />
        <div className="container min-h-[10vh] w-[80vw] m-auto mt-[27px] flex justify-center flex-wrap gap-[40px] pb-5">
          {
            posts && posts.length >0 ? posts.map((e, i) => {
              return <BlogComp key={i} blog={e} />
            }) : 
            <div className='text-center font-semibold text-blue-900'>Loading..</div> 
          }
        </div>
      </div>
    </>
  )
}

export default Categories