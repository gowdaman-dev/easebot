import { useState } from "react";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
function DashboardNav() {
  const { data: session } = useSession();
  const [userrole, setUserrole] = useState();
  const [menu, setMenu] = useState();
  const userinfo = async (email) => {
    const req = await fetch("http://localhost:3000/api/user/useracc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emaildata: email }),
    });
    if (req.ok) {
      const { username, usermail, userrole } = await req.json();
      setUserrole(userrole);
      return { username, usermail, userrole };
    }
  };
  userinfo(session?.user?.email);
  return (
    <div className=" flex  justify-between  items-center w-full h-[60px] px-8  border-r-[1px]">
      <h2 className="logo bg-gradient-to-tr from-orange-500 to-blue-500 bg-clip-text text-transparent">
        DashBoard
      </h2>
      {userrole == "admin" && (
        <>
          <Link href={'/dashboard'} className=" text-xl text-center  bg-gray-300/[.8] text-black w-[30px] h-[30px] rounded ">
            +
          </Link>
          <Link href={'/admindashboard'} className=" text-sm  text-gray-300 bg-black ">Accounts</Link>
        </>
      )}
      <button
        onClick={() => signOut()}
        className=" text-sm bg-gradient-to-tr from-orange-500 to-blue-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardNav;
