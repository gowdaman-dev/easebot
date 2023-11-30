'use client'
import React from 'react'
import DashboardNav from '../components/DashboardNav'
import AdminPanal from '../components/AdminPanal'
import { useSession } from 'next-auth/react'
function page() {
  const { data: session } = useSession()
  return (
    <div className="flex flex-col w-screen min-h-screen text-white bg-black ">
      <DashboardNav/>
      <div className="flex flex-col items-center w-full min-h-screen py-4">
            <AdminPanal/>
      </div>
    </div>
  )
}

export default page