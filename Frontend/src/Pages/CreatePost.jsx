import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'link': 'image' },],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const POST_CATEGORIES = ['Agriculture', "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"];
    return (
        <>
            <div className="container min-h-[100vh] w-[100%] md:w-[80%] m-auto flex flex-col gap-[10px] pl-10">
                <h1 className="text-3xl font-bold mt-[100px] mb-[20px]">Create Post</h1>
                <label htmlFor="title" className='w-[90%] relative font-semibold text-xl ml-2'>Title: </label>
                <input type="text" placeholder='Enter the title of the blog...' className='p-3 border-2 w-[90%] relative h-[50px]' />
                <label htmlFor="title" className='w-[90%] relative font-semibold text-xl ml-2'>Blog Content: </label>
                <ReactQuill className='h-[40vh] w-[90%] mb-24 md:mb-16' modules={modules} formats={formats} placeholder='Enter your blog content here' />
                <label htmlFor="category" className='w-[90%] relative font-semibold text-xl ml-2'>Categories : </label>
                <select name="category" value={''} onChange={''} className='w-[90%] border-2 h-[30px]'>
                    {
                        POST_CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)
                    }
                </select>
                <label htmlFor="thumbnail" className='w-[90%] relative font-semibold text-xl ml-2'>Upload Thumbnail : </label>
                <input type="file" accept='png , jpg , jpeg' />

                <button type="submit" className='bg-blue-600 font-semibold w-[200px] h-[40px] mt-[10px] text-white'>Create Post</button>
            </div>
        </>
    )
}

export default CreatePost