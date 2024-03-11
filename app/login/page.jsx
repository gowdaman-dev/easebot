'use client'
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn   } from "next-auth/react";
import {useSession} from "next-auth/react"
import { redirect } from 'next/navigation'
function page() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  
  const eventHandler = async (e) =>{
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email , pass , redirect:false
      })
      if(res.error){
        setErr('Invalid Email or Password')
        return;
      }
      router.forward('/dashboard')
    } catch (error) {
      
    }
  }
  if (session?.user?.email){
    redirect('/dashboard')
  }
  return (
    <div className="h-screen w-screen bg-white grid place-items-center">
      {err && (
        <div className="fixed text-center text-sm py-2 tracking-widest font-light text-white mx-auto top-0 w-[350px] min-h-5 bg-gray-400/[.5] rounded-b border-b-2 border-red-500">
          {err}
        </div>
      )}
      <div className="items-center flex flex-col min-h-[200px] w-[350px] border rounded">
        <h3 className="uppercase  py-4 text-black font-bold text-xl w-[80%] border-b-[1px] text-center">
          Login
        </h3>
        <form
          className=" flex flex-col w-[80%] gap-4 my-4 item-center"
          action=""
          onSubmit={eventHandler}
          method="post"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 bg-gray-200 rounded focus-visible:outline-dotted outline-2 outline-white"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            className="px-3 py-2 bg-gray-200 rounded focus-visible:outline-dotted outline-2 outline-white"
            type="password"
            placeholder="Password"
          />
          <button className="bg-black text-white py-2 rounded" type="submit">
            LOGIN
          </button>
          <p className="text-[10px] text-center mt-[-10px] text-gray-400">
            If you are new user register{" "}
            <Link className="text-blue-600" href={"/register"}>
              here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default page;
