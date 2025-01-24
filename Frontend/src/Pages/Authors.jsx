import React, { useEffect, useState } from 'react'
import Author from '../components/Author'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
const Authors = () => {
  const [authors , setAuthors] = useState([]);
  useEffect(()=>{
    fetchAuthors();
  },[])

  async function fetchAuthors() {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/getAuthors`);
      // console.log(res);
      setAuthors(res.data.Authors);
    }
    catch(err){
      console.log(err);
      toast.error("Error fetching the authors")
    }
  }
  return (
    <>
    <div className="container min-h-[100vh] w-[80%] m-auto flex flex-col gap-[30px] items-center pb-5">
        <h1 className="text-3xl font-bold mt-[100px]">Authors</h1>
        <div className="flex flex-wrap gap-[20px] items-center justify-center">
          {
            authors.length > 0 ? authors.map((e,i)=>{
              return <Author key={i} author={e}/>
            })  : <div>No Authors Exists</div>
          }
        </div>
    </div>
    </>
  )
}

export default Authors