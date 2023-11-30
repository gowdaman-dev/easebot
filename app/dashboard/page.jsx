"use client";
import React from "react";
import { useSession } from "next-auth/react";
import DashboardNav from "../components/DashboardNav";
import AddNotice from "../components/AddNotice";
import UserNotice from "../components/UserNotice";
function page() {
  const { data: session } = useSession();
  return (
    <div className=" flex flex-col min-h-screen w-screen bg-black text-white">
      <DashboardNav/>
      <div className="min-h-screen w-full flex flex-col py-4 items-center">
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
