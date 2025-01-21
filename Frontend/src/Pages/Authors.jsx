import React from 'react'
import Author from '../components/Author'

const Authors = () => {
  return (
    <>
    <div className="container min-h-[100vh] w-[80%] m-auto flex flex-col gap-[30px] items-center bg-red-600">
        <h1 className="text-3xl font-bold mt-[100px]">Authors</h1>
        <div className="flex flex-col gap-[10px]">
            <Author/>
        </div>
    </div>
    </>
  )
}

export default Authors