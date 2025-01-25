import React, { useEffect, useState, useRef } from 'react'
import author from '/author.jpg'
import { FaEdit } from "react-icons/fa";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import AnimatedSVG from '../components/AnimatedSVG';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false);
  // console.log(user)
  const [data, setData] = useState({
    fullName: '',
    email: '',
    Avatar: '',
  });

  useEffect(() => {
    setLoading(true)
    if (user) {
      setData({
        fullName: JSON.parse(user).fullName,
        email: JSON.parse(user).email,
        Avatar: JSON.parse(user).Avatar,
      });
    }
    setFormData({ ...formData, 'fullName': data.fullName, 'Avatar': data.Avatar, 'email': data.email })

    if (!isAuthenticated) {
      loginError();
    }

    setLoading(false)
  }, [user]);

  const [formData, setFormData] = useState({
    Avatar: data.Avatar,
    fullName: data.fullName,
    email: data.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',

  });

  // console.log(data)

  const loginError = () => {
    toast('You need to login first')
    setTimeout(() => {
      navigate('/login');
    }, 1500)
  }

  async function updateProfile(e) {
    e.preventDefault();

    console.log(formData)
    const updatedData = new FormData();
    updatedData.append('email', formData.email)
    updatedData.append('fullName', formData.fullName)
    updatedData.append('currentPassword', formData.currentPassword)
    updatedData.append('newPassword', formData.newPassword)
    updatedData.append('confirmNewPassword', formData.confirmNewPassword)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/update`, updatedData, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(res.data)
      toast.success('Profile Updated Successfully!');
      setTimeout(() => {
        navigate('/login');
        logout();
      }, 1500);
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.error || 'Some error occured')
    }
  }

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function changeFileHandler(e) {
    setFormData({ ...formData, 'Avatar': e.target.files[0] })
  }

  async function getUserPost(e) {
    e.preventDefault();
    navigate('/posts', { state: { name: 'me' } });
  }
  return (
    <>
      <div className="container min-h-[100vh] flex-col m-auto items-center w-[100vw] gap-[18px] flex pb-5">
        <ToastContainer />
        {
          loading ? <AnimatedSVG /> :
            isAuthenticated ? <>
              {
                data && <><div className="profile h-[300px] w-[300px] bg-yellow-500 border-[14px] border-blue-400 rounded-full overflow-hidden mt-[100px]">
                  <img src={data.Avatar} alt="" className='h-[100%] w-[100%] rounded-full' ref={fileInputRef} />
                </div>
                  <FaEdit className='h-[30px] w-[30px] relative top-[-66px] right-[-90px] invisible' onClick={() => {
                    console.log('clicked')
                    fileInputRef.current.click();
                  }} />
                  <input type="file" name='Avatar' onChange={changeFileHandler} className='hidden' />

                  <button className="text-[16px] text-white font-semibold p-2 bg-blue-500 rounded-md top-[-58px] relative" onClick={getUserPost}>My Posts</button>

                  <input type="text" placeholder='Your Full Name' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2' name='fullName' value={formData.fullName} onChange={changeHandler} />

                  <input type="text" placeholder='Your Current email' value={data.email} className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2' disabled />

                  <input type="password" placeholder='Current Password' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2' name='currentPassword' value={formData.currentPassword} onChange={changeHandler} />

                  <input type="password" placeholder='New Password' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2' name='newPassword' value={formData.newPassword} onChange={changeHandler} />

                  <input type="password" placeholder='Confirm new password' className='top-[-70px] border-2 rounded-md w-[80%] md:w-[50%] relative p-2' value={formData.confirmNewPassword} name='confirmNewPassword' onChange={changeHandler} />

                  <button className='top-[-70px] relative bg-blue-600 p-2 px-4 rounded-md text-white' name='confirmNewPassword' onClick={updateProfile}>Update Profile</button>
                </>
              }
            </>
              : <><ToastContainer />
                <AnimatedSVG />
              </>
        }

      </div>
    </>
  )
}

export default Profile;