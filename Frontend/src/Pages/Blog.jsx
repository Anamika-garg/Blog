import React, { useEffect, useState } from 'react'
import author from '/author.jpg'
import bg from '/1.jpg'
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import AnimatedSVG from '../components/AnimatedSVG';



const Blog = () => {
    const { id } = useParams();
    const [like, setLike] = useState(false);
    const [postData, setPostData] = useState({});
    const [authorData, setAuthorData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    const [myComment, setMyComment] = useState('');
    const [formattedTime, setformattedTime] = useState('');
    const [loading , setLoading] = useState(false);


    useEffect(() => {
        if (postData?.createdAt) {
            try {
                const formatted = formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true });
                setformattedTime(formatted);
            } catch (error) {
                console.error("Error formatting date:", error);
            }
        }
    }, [postData?.createdAt]);

    const reactOnPost = async () => {
        setLike(!like);
        // try{
        //     const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/${like ? 'unlike' : 'like'}/${id}`,{
        //         headers : {
        //             Authorization : `Bearer ${localStorage.getItem('authToken')}`
        //         }
        //     })
        //     console.log('hey')
        //     console.log(res.data);
        // }
        // catch(err){
        //     console.log(err);
        //     toast.error("Can't like the Post")
        // }

    }

    const changeHandler = (e) => {
        setMyComment(e.target.value);
    }

    useEffect(() => {
        fetchDetails();
    }, [like]);

    async function fetchDetails() {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/post/${id}`);
            // console.log(res);
            // console.log(res.data.Post);
            setPostData(() => res.data.Post)
            setAuthorData(() => res.data.Author)
            setCommentData(() => res.data.comments)
            // console.log(commentData);
            console.log('postData.createdAt:', postData?.createdAt);
            setLoading(false);

        }
        catch (err) {
            console.log(err);
            // toast.error("Some Error Occured!")
        }
    }

    const commentHandler = async (e) => {
        e.preventDefault();
        if (!myComment) {
            toast.error("Write your comment");
            return
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/comment/${id}`, { comment: myComment }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            // console.log(res)
        }
        catch (err) {
            console.log(err);
            toast.error("Can't Add your Comment")
        }
        fetchDetails();
        setMyComment('')
    }
    return (
        <>
            <div className="container min-h-[100vh] w-full m-auto bg-white flex flex-col items-center justify-center pb-5">
                <ToastContainer />
                {
                    loading ? <AnimatedSVG/> : 
                    postData ? <>
                        <div className="head-con bg-slate-200 flex justify-center min-h-[60vh] w-[100vw]">
                            <div className="heading text-center w-[80%] lg:w-[50%] relative flex items-center justify-center gap-[26px] flex-col min-h-[20px]">
                                <h1 className='text-3xl font-semibold mt-14 lg:mt-0'>
                                    {postData.title}
                                </h1>
                                <div className="author flex w-full relative min-h-[50px] gap-[6px] items-center flex-col">
                                    <div className="image rounded-full ml-2 h-[70px] w-[70px] bg-slate-600 overflow-hidden">
                                        <img src={authorData.Avatar} alt="" className='relative rounded-full h-[100%] w-[100%]' />
                                    </div>
                                    <div className="text-xl font-bold">{authorData.fullName}</div>
                                    <div className="text-[17px] font-semibold">({formattedTime})</div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-con container mx-auto lg:w-[70%] relative bg-white min-h-[60vh] z-5 top-[-30px] lg:top-[-80px] rounded-sm flex flex-col border-4">
                            <div className="img-con h-[40vh] md:w-[100%] w-[90%] mx-auto relative bg-slate-500">
                                <img src={postData.thumbnail} alt="" className='h-[100%] w-[100%]' />
                            </div>

                            <div className="content p-5 relative" dangerouslySetInnerHTML={{ __html: postData.desc }}>

                            </div>

                        </div>
                        {
                            userData != null &&
                            <div className="feedback-sec relative lg:w-[70%] min-h-[40px] lg:top-[-70px] w-[95%] flex justify-center">
                                <div className="comment flex w-full relative h-[50px] gap-[6px] items-center">
                                    <div className="image rounded-full h-[40px] w-[40px] ml-2">
                                        <img src={userData.Avatar} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                                    </div>
                                    <input type="text" placeholder='Add a comment..' className='p-2 w-[80%] border-2 outline-none' value={myComment} onChange={changeHandler} />
                                    <IoSend className='w-[30px] h-[30px]' onClick={commentHandler} />
                                    <div className='flex flex-col justify-center items-center'>
                                        {
                                            like ?
                                                <FcLike className='w-[30px] h-[30px] transition-all' onClick={reactOnPost} /> :
                                                <CiHeart className='w-[35px] h-[35px] transition-all' onClick={reactOnPost} />
                                        }
                                        {/* <p>{postData.Likes}</p> */}
                                    </div>
                                    <FaShare className='w-[30px] h-[30px]' />
                                </div>
                            </div>
                        }
                        <div className="ml-4 comments gap-[10px] relative min-h-[40px] lg:w-[70%] lg:top-[-60px] w-[95%] flex justify-center flex-col">
                            <h1 className='text-xl mt-[10px] font-semibold'>Comments ({commentData.length})</h1>
                            {
                                commentData.length > 0 ? commentData.map((e, i) => {
                                    return <Comment key={i} commentData={e} />
                                }) : <div className='text-center font-semibold'>No comments yet</div>
                            }
                        </div>
                    </> : <><div className='text-xl text-center font-semibold'>
                        
                    </div></>
                }


            </div>
        </>
    )
}

export default Blog