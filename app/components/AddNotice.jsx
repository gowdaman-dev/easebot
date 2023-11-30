import { useSession } from "next-auth/react";
import { useState } from "react";

function AddNotice() {
  const [notice, setNotice] = useState("");
  const { data: session } = useSession(); 

  const postNotice = async (e) => {
    e.preventDefault();
    if (notice == ""){
      return
    }
    try {
      const req = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: session?.user?.name,email: session?.user?.email,message: notice,
        }),
      });
      if (req.ok) {
        const form = e.target;
        form.reset();
        setNotice('')
        console.log("form reset");
      }
    } catch (error) {
      console.error("Error posting notice:", error);
    }
  };

  return (

    <form
      onSubmit={postNotice}
      className="w-full flex flex-col  items-center"
      action=""
      method="post"
    >
      <textarea
        onChange={(e) => setNotice(e.target.value)}
        placeholder="Type Your Notice....."
        className="resize-none w-[90%] text-gray-200 outline-dotted outline-2 outline-white bg-gray-300/[.5] rounded p-2 focus-visible:outline-orange-400"
        name=""
        id=""
        cols="30"
        rows="10"
        required
      ></textarea>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors duration-300 text-black w-[90%]  my-2 px-4 py-2 rounded"
        type="submit"
      >
        Post Yours Notice
      </button>
    </form>
  );
}

export default AddNotice;

