import React from 'react'
import Author from '../components/Author'

const Authors = () => {
  return (
    <>
    <div className="container min-h-[100vh] w-[80%] m-auto flex flex-col gap-[30px] items-center pb-5">
        <h1 className="text-3xl font-bold mt-[100px]">Authors</h1>
        <div className="flex flex-wrap gap-[20px] items-center justify-center">
            <Author/>
            <Author/>
            <Author/>
            <Author/>
            <Author/>
        </div>
    </div>
    </>
  )
}

export default Authors