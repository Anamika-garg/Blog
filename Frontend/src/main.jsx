import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout.jsx'
import Blog from './Pages/Blog.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Authors from './Pages/Authors.jsx'
import CreatePost from './Pages/CreatePost.jsx'
import Profile from './Pages/Profile.jsx'
import { AuthProvider } from '../Context/AuthContext.jsx'
import PostsBy from './Pages/PostsBy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/posts' element={<PostsBy />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
