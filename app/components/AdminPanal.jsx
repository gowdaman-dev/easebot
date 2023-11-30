import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";


function AdminPanal() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const users = async () => {
      const res = await fetch('/api/listuser')
      const { admindata } =await  res.json();
      await setAccounts(admindata)
      console.log(accounts)
    }
    users();
  })

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
          <span className="text-transparent capitalize bg-gradient-to-tr from-orange-500 to-blue-500 bg-clip-text">
            {session?.user?.name}{" "}
          </span>
        </h4>
        <div className="flex flex-col w-full gap-4 py-4">
          {
            accounts.map((item) => {
              return (
                <div className="p-4 flex flex-col gap-2 w-[400px] min-h-10 bg-gray-800/[.7] rounded">
                  <div className="flex">
                    <p className="w-[70px]">name</p><p className="">{item.name}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[70px]">email</p><p className="">{item.email}</p>
                  </div>
                  <form onSubmit={deleteUser} action="" method="post">
                    <input type="text" hidden name='userid' value={item._id} />
                    <button className="px-4 py-1 bg-red-400 rounded" type="submit">Remove user</button>
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
