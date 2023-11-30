'use client'
import React from 'react'
import DashboardNav from '../components/DashboardNav'
import AdminPanal from '../components/AdminPanal'
import { useSession } from 'next-auth/react'
function page() {
  const { data: session } = useSession()
  return (
    <div className=" flex flex-col min-h-screen w-screen bg-black text-white">
      <DashboardNav/>
      <div className="min-h-screen w-full flex flex-col py-4 items-center">
            <AdminPanal/>
      </div>
    </div>
  )
}

export default page