import React, { useEffect, useState } from 'react'
import author from '/author.jpg'
import { formatDistanceToNow } from "date-fns";
import axios from 'axios';

const Comment = ({commentData}) => {
    // console.log(commentData);
    const userId = commentData.userId;
    const [commenter , setCommenter] = useState({});
    const formattedTime = formatDistanceToNow(new Date(commentData.createdAt), { addSuffix: true });

    useEffect(()=>{
        fetchDetails();
    },[])

    async function fetchDetails() {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/author/${userId}`);
        setCommenter(res.data.user)
    }

    return (
        <>
            <div className="comment-con py-4 my-2 container h-[50px] lg:w-[50%] flex items-center gap-[10px]">
                <div className="image rounded-full h-[40px] w-[40px]">
                    <img src={commenter.Avatar} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                </div>
                <div className="content flex flex-col">
                    <div className="cred flex items-center gap-[6px]">
                        <h1 className='text-[17px] font-semibold'>{commenter.fullName}</h1>
                        <small>({formattedTime})</small>
                    </div>
                    <div className="comment">{commentData.comment}</div>
                </div>
            </div>
        </>
    )
}

export default Comment