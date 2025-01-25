import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { POST_CATEGORIES } from '../../data'
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Catgory from '../components/Catgory';
import axios from 'axios';
import AnimatedSVG from '../components/AnimatedSVG';


const CreatePost = () => {
    const { isAuthenticated , token } = useAuth();
    const navigate = useNavigate();
    const [show , setShow] = useState(true);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
          loginError();
        } else {
          setShow(true); 
        }
      }, [isAuthenticated]);
      
      const loginError = () => {
        toast('You need to login first');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      };

    if (!show) {
        loginError();
    }

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        category: POST_CATEGORIES[1],
        thumbnail: null,
    });

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fileChangeHandler = (e) => {
        console.log(e.target.files[0]); // Check what is being passed
        if (e.target.files && e.target.files[0]) {
          setFormData({ ...formData, thumbnail: e.target.files[0] });
        }
      };
      

    const descChangeHandler = (content) => {
        setFormData({ ...formData, desc: content });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData)
        if (!formData.title || !formData.desc || !formData.category || !formData.thumbnail) {
            toast.error('All fields are required!');
            return;
        }

        const postData = new FormData();
        postData.append("title" , formData.title)
        postData.append("desc" , formData.desc)
        postData.append("thumbnail" , formData.thumbnail)
        postData.append("category" , formData.category)

        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/create`, postData , {
                headers : {
                    "Content-Type" : 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`
                }
            });
            setFormData({
                title: '',
                desc: '',
                Catgory: '',
                thumbnail : null
              });
            // console.log(res);
            toast.success(res.data.success);
            setLoading(false);
            setTimeout(() => {
                navigate(`/blog/${res.data.Post._id}`)
            }, 1200);
        }
        catch(err){
            console.log(err)
            toast.error(err.response.data.error);
            setLoading(false);
        }
    };
    return (
        <>
            <div className="container min-h-[100vh] w-[100%] md:w-[80%] m-auto flex flex-col gap-[10px] pl-10 pb-5">
                {
                    
                
                    loading ? <div className='text-center flex items-center justify-center min-h-[50vh] w-[100vw]'><AnimatedSVG/> </div> :
                
                    show ? <>
                    <ToastContainer/>
                        <h1 className="text-3xl font-bold mt-[100px] mb-[20px]">Create Post</h1>
                        <label htmlFor="title" className='w-[90%] relative font-semibold text-xl ml-2'>Title: </label>
                        <input type="text" placeholder='Enter the title of the blog...' className='p-3 border-2 w-[90%] relative h-[50px]' onChange={changeHandler} value={formData.title} name='title' />

                        <label htmlFor="desc" className='w-[90%] relative font-semibold text-xl ml-2'>Blog Content: </label>
                        <ReactQuill className='h-[40vh] w-[90%] mb-24 md:mb-16' modules={modules} formats={formats} placeholder='Enter your blog content here..' onChange={descChangeHandler} value={formData.desc} name="desc" />

                        <label htmlFor="category" className='w-[90%] relative font-semibold text-xl ml-2'>Categories : </label>
                        <select name="category" onChange={changeHandler} value={formData.category} className='w-[90%] border-2 h-[30px]'>
                            {
                                POST_CATEGORIES.slice(1).map((cat) => <option key={cat}>{cat}</option>)
                            }
                        </select>
                        <label htmlFor="thumbnail" className='w-[90%] relative font-semibold text-xl ml-2'>Upload Thumbnail : </label>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="thumbnail"
                            onChange={fileChangeHandler}
                        />

                        <button type="submit" className='bg-blue-600 font-semibold w-[200px] h-[40px] mt-[10px] rounded-md text-white hover:bg-blue-500 transition-all' onClick={handleSubmit}>Create Post</button>
                    </> : <ToastContainer />
                }
            </div>

        </>
    )
}

export default CreatePost
