import { useSession } from 'next-auth/react'
async function UserAcc() {
    const {data : session } =  await useSession();
    console.log(session?.user?.email);
    const userdata = await fetch('api/user/userexist',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:"damangowdaman@gmail.com"}),
      });
      const useracc  = await userdata.json();
      console.log(useracc);
    return useracc
}

export default UserAcc