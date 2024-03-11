"use client"
import React, { useEffect } from 'react';
import Notfications from './components/Notfications';
const page = () => {
  useEffect(()=>{
    window.addEventListener('keypress',async (e)=>{
      let Key =  await e.key
      if (Key == "N" || Key == 'n'){
        window.location.replace("https://jahangeer7704.github.io/navigation/")
      }
    })
  })
  return (
    <div className='h-screen w-screen overflow-y-hidden bg-white'>
      <a href="https://jahangeer7704.github.io/navigation/" className='hover:bg-gray-500 ease-in-out transition-colors duration-500 bg-gray-200 absolute bottom-0 right-0 m-4 z-10 p-2'>For Navigator Press N</a>
      <h1 className='text-center h-25   capitalize  text-purple-500 font-extrabold tracking-[8px] py-4 text-xl'>Mr.Notifier</h1>
      <div className="mx-auto w-2/3 h-full overflow-y-scroll scrollbar-hide p-3   ">
          <Notfications />
          <div className="absolute bottom-0 left-0 w-full h-[50px] bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </div>
  )
}

export default page
