'use client'
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

export const GlobalContent = createContext();

export const UserContext = ({children}) =>{
    const {data : session} = useSession();
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [role , setRole] = useState();
    setEmail(session?.user?.email)
    setName(session?.user?.name)
    useEffect( async ()=>{
        try {
            const res = await fetch('api/user/useracc',{
                method:'post',
                headers:{
                    "Context-Type":'application/json',
                },
                body:JSON.stringify({email})
            })
            if (res.ok){
                const {role} = res.json();
                setRole("admin");
            }
            
        } catch (error) {
            console.log(error);
        }
    })
    return(
        <GlobalContent.Provider value={{name , email ,role}}>
            {children}
        </GlobalContent.Provider>
    )
}
