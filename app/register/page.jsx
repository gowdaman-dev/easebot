"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useSession} from "next-auth/react"
import { redirect } from 'next/navigation'
function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router  = useRouter();
  const { data: session } = useSession();
  if (session?.user?.email){
    redirect('/dashboard')
  }
  const eventHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !pass) {
      setErr("Please fill all fields!");
    } else {
      setErr("");
      try {
        const requser = await fetch("api/user/userexist/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const { user } = await requser.json();
        if(user) {
          setErr("Email Already Exists!");
          return;
        }

        const req = await fetch("api/user/register/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email,role:"user" , pass }),
        });
        if (req.ok) {
          const form = e.target;
          form.reset();
          router.push('/login');
          console.log("done");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-screen w-screen bg-white grid place-items-center">
      {err && (
        <div className="fixed text-center text-sm py-2 tracking-widest font-light text-white mx-auto top-0 w-[350px] min-h-5 bg-gray-400/[.5] rounded-b border-b-2 border-red-500">
          {err}
        </div>
      )}
      <div className="items-center flex flex-col min-h-[400px] w-[350px] bg-white border rounded">
        <h3 className="uppercase  py-4 text-black font-bold text-xl w-[80%] border-b-[1px] text-center">
          Register
        </h3>
        <form
          onSubmit={eventHandler}
          className=" flex flex-col w-[80%] gap-4 my-4 item-center"
          action=""
          method="post"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded bg-gray-100 focus-visible:outline-dotted outline-2 outline-white"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded bg-gray-100 focus-visible:outline-dotted outline-2 outline-white"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            className="px-3 py-2 rounded bg-gray-100 focus-visible:outline-dotted outline-2 outline-white"
            type="password"
            placeholder="Password"
          />
          <p className="text-[10px] text-gray-400 font-light">
            Note : Use strong password for your Account Security
          </p>
          <button className="bg-black text-white py-2 rounded" type="submit">
            REGISTER
          </button>
          <p className="text-[10px] text-center mt-[-10px] text-gray-400">
            Already a user Login{" "}
            <Link className="text-blue-600" href={"/login"}>
              here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default page;
