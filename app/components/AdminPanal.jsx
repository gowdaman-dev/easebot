import { useSession} from "next-auth/react";
import React, { useEffect, useState } from "react";


function AdminPanal() {
  const { data: session } = useSession();
  const [accounts , setAccounts] = useState([]);
  /*useEffect(() => {
    const users = async ()=>{
      try {
        const res = await fetch('/api/listuser')
        const {admindata} = await res.json()
        setAccounts(admindata)
        console.log(accounts)
      } catch(e) {
        console.log(e);
      }
    }
    users();
  })
*/

useEffect(() => {
    const fetchUserNotice = async () => {
      try {
        const res = await fetch("/api/listuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            getrole:"user"
          }),
        });

        if (res.ok) {
          const { admindata } = await res.json();
          if (Array.isArray(admindata) && admindata.length > 0) {
            setAccounts(admindata);
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
  const deleteUser = async (e) => {
    e.preventDefault()
    try {
      await fetch("/api/deluser", {
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
      <div className="flex flex-col">
        <h4>
          Welcome{" "}
          <span className="bg-gradient-to-tr capitalize from-orange-500 to-blue-500 bg-clip-text text-transparent">
            {session?.user?.name}{" "}
          </span>
        </h4>
          <div className="flex flex-col gap-4 py-4 w-full">
            {
              accounts.map((item)=>{
                return(
                   <div className="p-4 flex flex-col gap-2 w-[400px] min-h-10 bg-gray-800/[.7] rounded">
                     <div className="flex">
                       <p className="w-[70px]">name</p><p className="">{item.name}</p>
                     </div>
                     <div className="flex">
                       <p className="w-[70px]">email</p><p className="">{item.email}</p>
                     </div>
                     <form onSubmit={deleteUser} action="" method="post">
                      <input  type="text" hidden name='userid' defaultValue={item._id} />
                      <button className="bg-red-400 px-4 py-1 rounded"  type="submit">Remove user</button>
                     </form>
                   </div>
                  )
              })
            }
          </div>
      </div>
    </>
  );
}

export default AdminPanal;
