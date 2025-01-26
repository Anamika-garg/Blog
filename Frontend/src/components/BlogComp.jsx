import React, { useEffect, useState } from 'react'
import bg from '/1.jpg'
import author from '/author.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatDistanceToNow } from "date-fns";
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../../Context/AuthContext'

const BlogComp = ({ blog , type }) => {
    const navigate = useNavigate();
    const {token} = useAuth()
    useEffect(() => {
        fetchDetails();
    },[])
    const [author, setAuthor] = useState({});
    const authorId = blog.authorId;
    const formattedTime = formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true });
    const fetchDetails = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/author/${authorId}`)
            // console.log(res);
            setAuthor(res.data.user);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deletePost = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_POST_URL}/delete/${blog._id}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            console.log(res);
            toast.success(res.data.success);
            setTimeout(()=>{
                navigate('/profile');
            },1400)
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.error || "Some Error Occured deleting the post")
        }
    }
    return (
        <>
            <Link to={`/Blog/${blog._id}`}>
            <ToastContainer/>
            <div className="blog box-shadow h-[350px] md:w-[350px] w-[300px] lg:w-[320px] bg-white rounded-md overflow-hidden border border-slate-300 cursor-pointer">
                <div className="img-con w-[100%] relative h-[200px] rounded-md overflow-hidden">
                    <img src={blog.thumbnail} alt="" className='absolute h-[100%] w-[100%]' />

                </div>
                <div className="content w-[100%] flex flex-col mt-[2px] gap-[3px] px-1">
                    <div className="upper-head flex justify-between mt-1">
                        <span className='ml-2 text-[13px] font-semibold px-2 py-1 flex items-center justify-center text-white rounded-[6px] bg-slate-800'>{blog.category}</span>
                        <span className='ml-2 text-[15px] font-semibold p-1 text-slate-500'>({formattedTime})</span>
                    </div>
                        <h1 className={`ml-2 text-xl font-semibold hover:underline transition-all`}>{blog.title.slice(0, 20)}...</h1>
                        <p className='ml-2 text-[14px]'  dangerouslySetInnerHTML={{ __html: `${blog.desc.length < 20 ? blog.desc : blog.desc.slice(0, 15)}...`}}></p>
                    
                </div>

                <div className="author flex relative h-[50px] gap-[6px] self-center justify-self-center flex-wrap items-center w-[90%] justify-between">
                    <span className='flex gap-[6px]'>
                    <div className="image rounded-full h-[30px] w-[30px] ml-2">
                        <img src={author.Avatar} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                    </div>
                    <div className="name">By: {author.fullName}</div>
                    </span>
                {
                        type == 'my' ? <>
                        <div className="flex relative right-0 items-center justify-center gap-[4px]">
                            {/* <button className='px-2 py-1 bg-green-400 rounded-md'>Edit</button> */}
                            <button className='px-2 py-1 bg-red-400 rounded-md' onClick={deletePost}>Delete</button>
                        </div>
                        </> : <></>
                    }
                </div>
            </div>
            </Link>
        </>
    )
}

export default BlogComp