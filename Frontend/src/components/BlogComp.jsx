import React, { useEffect, useState } from 'react'
import bg from '/1.jpg'
import author from '/author.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatDistanceToNow } from "date-fns";

const BlogComp = ({ blog }) => {
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
    return (
        <>
            <div className="blog box-shadow min-h-[350px] md:w-[350px] w-[300px] bg-white rounded-md overflow-hidden border border-slate-300 cursor-pointer">
                <div className="img-con w-[100%] relative h-[200px] rounded-md">
                    <img src={blog.thumbnail} alt="" className='absolute h-[100%] w-[100%]' />

                </div>
                <div className="content w-[100%] flex flex-col mt-[2px] gap-[3px] px-1">
                    <div className="upper-head flex justify-between mt-1">
                        <span className='ml-2 text-[13px] font-semibold px-2 py-1 flex items-center justify-center text-white rounded-[6px] bg-slate-800'>{blog.category}</span>
                        <span className='ml-2 text-[15px] font-semibold p-1 text-slate-500'>({formattedTime})</span>
                    </div>
                    <Link to={`/Blog/${blog._id}`}>
                        <h1 className={`ml-2 text-xl font-semibold hover:underline transition-all`}>{blog.title.slice(0, 30)}...</h1>
                        <p className='ml-2 text-[14px]'  dangerouslySetInnerHTML={{ __html: `${blog.desc.slice(0, 40)}..`}}></p>
                    </Link>
                </div>
                <div className="author flex w-full relative h-[50px] gap-[6px] items-center">
                    <div className="image rounded-full h-[30px] w-[30px] ml-2">
                        <img src={author.Avatar} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                    </div>
                    <div className="name">By: {author.fullName}</div>
                </div>
            </div>
        </>
    )
}

export default BlogComp