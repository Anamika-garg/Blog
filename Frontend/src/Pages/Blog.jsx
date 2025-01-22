import React from 'react'
import author from '/author.jpg'
import bg from '/1.jpg'
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import Comment from '../components/Comment';


const Blog = () => {
    return (
        <>
            <div className="container min-h-[100vh] w-full m-auto bg-white flex flex-col items-center justify-center pb-5">
                <div className="head-con bg-slate-200 flex justify-center min-h-[60vh] w-[100vw]">
                    <div className="heading text-center w-[80%] lg:w-[50%] relative flex items-center justify-center gap-[26px] flex-col min-h-[20px]">
                        <h1 className='text-3xl font-semibold mt-14 lg:mt-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.
                        </h1>
                        <div className="author flex w-full relative min-h-[50px] gap-[6px] items-center flex-col">
                            <div className="image rounded-full ml-2 h-[70px] w-[70px] bg-red-600 overflow-hidden">
                                <img src={author} alt="" className='relative rounded-full h-[100%] w-[100%]' />
                            </div>
                            <div className="text-xl font-bold">Anamika Garg</div>
                        </div>
                    </div>
                </div>
                <div className="blog-con container mx-auto lg:w-[70%] relative bg-white min-h-[100vh] z-5 top-[-30px] lg:top-[-80px] rounded-sm flex flex-col border-4">
                    <div className="img-con h-[40vh] md:w-[100%] w-[90%] m-auto relative bg-red-500">
                        <img src={bg} alt="" className='h-[100%] w-[100%]' />
                    </div>

                    <div className="content p-5">
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores molestiae reprehenderit repellat, enim molestias inventore id doloribus quibusdam est totam delectus ducimus natus veritatis deleniti necessitatibus commodi vero velit esse!</h1>

                        <p>Welcome to our blog! Here, we aim to provide you with <strong>insightful tips</strong>, <strong>practical advice</strong>, and <strong>valuable resources</strong> to help you achieve your goals and stay informed about the latest trends in your field.</p>

                        <p>Our team of experienced writers and industry experts works tirelessly to deliver content that is not only <strong>informative</strong> but also <strong>engaging</strong> and easy to understand. Whether you're a beginner taking your first steps or an expert looking to refine your skills, you’ll find something here that resonates with you.</p>

                        <p>In this blog, we cover a wide range of topics, including <strong>how-to guides</strong>, <strong>success stories</strong>, and <strong>in-depth analyses</strong> of current trends. We believe in empowering our readers by providing them with the knowledge and tools they need to succeed in their personal and professional lives.</p>

                        <p>Why choose our blog? Because we prioritize <strong>quality</strong> over quantity, ensuring that every article you read here is backed by thorough research and real-world experience. We also encourage an open dialogue, so feel free to share your thoughts and insights in the comments section of each post.</p>

                        <p>If you're looking for tips on how to enhance productivity, improve your skills, or stay updated on industry news, you’ve come to the right place. Each week, we bring you fresh content designed to <strong>inspire</strong> and <strong>motivate</strong> you to take action and make meaningful changes in your life.</p>

                        <p>Don’t miss out! Make sure to <strong>subscribe</strong> to our newsletter to receive updates on new posts, exclusive offers, and bonus content delivered directly to your inbox. By subscribing, you’ll join a vibrant community of like-minded individuals who are committed to growth and learning.</p>

                        <p>Thank you for visiting our blog. We hope you find the content here both <strong>enlightening</strong> and <strong>inspiring</strong>. Stay connected, stay curious, and keep exploring!</p>
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores molestiae reprehenderit repellat, enim molestias inventore id doloribus quibusdam est totam delectus ducimus natus veritatis deleniti necessitatibus commodi vero velit esse!</h1>

                        <p>Welcome to our blog! Here, we aim to provide you with <strong>insightful tips</strong>, <strong>practical advice</strong>, and <strong>valuable resources</strong> to help you achieve your goals and stay informed about the latest trends in your field.</p>

                        <p>Our team of experienced writers and industry experts works tirelessly to deliver content that is not only <strong>informative</strong> but also <strong>engaging</strong> and easy to understand. Whether you're a beginner taking your first steps or an expert looking to refine your skills, you’ll find something here that resonates with you.</p>

                        <p>In this blog, we cover a wide range of topics, including <strong>how-to guides</strong>, <strong>success stories</strong>, and <strong>in-depth analyses</strong> of current trends. We believe in empowering our readers by providing them with the knowledge and tools they need to succeed in their personal and professional lives.</p>

                        <p>Why choose our blog? Because we prioritize <strong>quality</strong> over quantity, ensuring that every article you read here is backed by thorough research and real-world experience. We also encourage an open dialogue, so feel free to share your thoughts and insights in the comments section of each post.</p>

                        <p>If you're looking for tips on how to enhance productivity, improve your skills, or stay updated on industry news, you’ve come to the right place. Each week, we bring you fresh content designed to <strong>inspire</strong> and <strong>motivate</strong> you to take action and make meaningful changes in your life.</p>

                        <p>Don’t miss out! Make sure to <strong>subscribe</strong> to our newsletter to receive updates on new posts, exclusive offers, and bonus content delivered directly to your inbox. By subscribing, you’ll join a vibrant community of like-minded individuals who are committed to growth and learning.</p>

                        <p>Thank you for visiting our blog. We hope you find the content here both <strong>enlightening</strong> and <strong>inspiring</strong>. Stay connected, stay curious, and keep exploring!</p>
                    </div>

                </div>
                <div className="feedback-sec relative lg:w-[70%] min-h-[40px] lg:top-[-70px] w-[95%] flex justify-center">
                    <div className="comment flex w-full relative h-[50px] gap-[6px] items-center">
                        <div className="image rounded-full h-[40px] w-[40px] ml-2">
                            <img src={author} alt="" className='relative h-[100%] w-[100%] rounded-full' />
                        </div>
                        <input type="text" placeholder='Add a comment..' className='p-2 w-[80%] border-2 outline-none' />
                        <CiHeart className='w-[35px] h-[35px]'/>
                        <FaShare className='w-[30px] h-[30px]'/>
                    </div>
                </div>
                <div className="ml-4 comments gap-[10px] relative min-h-[40px] lg:w-[70%] lg:top-[-60px] w-[95%] flex justify-center flex-col">
                    <h1 className='text-xl mt-[10px] font-semibold'>Comments</h1>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>
            </div>
        </>
    )
}

export default Blog