"use client"
import React from 'react';
import Notfications from './components/Notfications';
const page = () => {
  return (
    <div className='h-screen w-screen overflow-y-hidden bg-black'>
      <h1 className='text-center h-25  bg-gradient-to-tr capitalize from-orange-500 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-[8px] py-4 text-xl'>Mr.Notifier</h1>
      <div className="mx-auto w-2/3 h-full overflow-y-scroll scrollbar-hide p-3  ">
          <Notfications />
          <div className="absolute bottom-0 left-0 w-full h-[50px] bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  )
}

export default page