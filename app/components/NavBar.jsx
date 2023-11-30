import React from 'react'
import { GetStaticPaths } from 'next'
function NavBar(path) {
  return (
    <div className='w-screen h-screen'>
        <nav className='w-full bg-black px-4 py-4'>
            <h4 className='text-green-400 tracking-widest font-bold'>Mr.Notifier</h4>
            <p>{
                (path == "register")?"Login":"Register"    
            }</p>
        </nav>
    </div>
  )
}

export default NavBar