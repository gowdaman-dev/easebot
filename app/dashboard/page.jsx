"use client";
import React from "react";
import { useSession } from "next-auth/react";
import DashboardNav from "../components/DashboardNav";
import AddNotice from "../components/AddNotice";
import UserNotice from "../components/UserNotice";
import { useRouter } from "next/navigation";
function page() {
  const { data: session } = useSession();
  const router = useRouter()
  if (!session?.user?.email){
    router.push('/login')
  }
  return (
    <div className="flex flex-col w-screen min-h-screen text-white bg-black ">
      <DashboardNav/>
      <div className="flex flex-col items-center w-full min-h-screen py-4">
        <h1 className="uppercase py-2 tracking-[2px] font-bold ">
          Welcome {session?.user?.name}
        </h1>
          <AddNotice/>
          <UserNotice/>
      </div>
    </div>
  );
}

export default page;
