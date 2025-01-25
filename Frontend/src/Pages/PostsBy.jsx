import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogComp from '../components/BlogComp';
import { useLocation , useNavigate } from 'react-router-dom';
import { toast , ToastContainer} from 'react-toastify';


const PostsBy = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        getUserPost();
    }, []);

    async function getUserPost() {
        try {
            if(location.state.name == 'me'){
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/getUserPosts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                console.log(res)
                setPosts(res.data.Posts);
            }
            else{
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/getAuthorPosts/${location.state.id}`);
                console.log(res)
                if(posts.length > 0){
                    setPosts(res.data.Posts);
                }
                else{
                    toast.error(`No Posts by ${location.state.name}`)
                    setTimeout(()=>{
                        navigate('/authors')
                    },1000)
                }

            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.error)
        }
    }
    return (
        <>
            <div className="container m-auto min-h-[96vh] w-[80vw] relative flex items-center flex-col gap-[40px] flex-wrap">
                <ToastContainer/>
                <div className="text-center text-2xl font-bold relative mt-[90px]"> Posts By {location.state.name} </div>
                {
                    posts.length > 0 ? posts.map((e, i) => {
                        return <BlogComp key={i} blog={e} />
                    }) :
                        <div className='text-center font-semibold text-blue-900 mt-[30px]'>Loading...</div>
                }
            </div>
        </>
    )
}

export default PostsBy