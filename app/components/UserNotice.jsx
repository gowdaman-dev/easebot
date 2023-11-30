import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineReload, AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

function UserNotice() {
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserNotice = async () => {
      try {
        const res = await fetch("/api/usernotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        });

        if (res.ok) {
          const { usernotice } = await res.json();
          if (Array.isArray(usernotice) && usernotice.length > 0) {
            setData(usernotice);
          } else {
            console.log("Empty or invalid data received");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session?.user?.email) {
      fetchUserNotice();
    }
  });
  const router = useRouter()
  const fetchUserNoticereload = () => {
    router.refresh()
  }
  const deleteRecord = async (e) => {
    e.preventDefault()
    try {
      await fetch("/api/delnotice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.target[0].value,
        })
      })
      await router.forward('/dashboard')
    } catch (error) {
      console.log(error);
    }
    console.log(e.target[0].value);
  }
  return (
    <>
      <div className="flex items-center justify-between w-full px-10 py-5">
        <h1 className="text-xl font-light text-red-400 uppercase ">Your Notice</h1>
        <button onClick={fetchUserNoticereload} className="flex items-center justify-center text-xl"><AiOutlineReload /></button>
      </div>
      <div className="flex flex-col-reverse items-center w-full gap-2">
        {data.map((item, index) => (
          <div key={index} className="w-[90%] min-h-[40px] p-2 bg-gray-900 rounded">
            <p className="text-white">{item.message}</p>
            <form onSubmit={deleteRecord} className="flex justify-end" action="" method="post">
              <input type="text" hidden name="id" defaultValue={item._id} />
              <button type="submit" className="text-red-400"><AiOutlineDelete /></button>
            </form>
          </div>
        ))}

      </div>
    </>
  );
}

export default UserNotice;
