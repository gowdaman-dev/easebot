import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Notfications() {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const event = async () => {
      try {
        const res = await fetch(`/api/notice`);
        if (!res.ok) {
          return new Error("can't fetch notice");
        }
        const { notice } = await res.json();
        if (Array.isArray(notice) && notice.length > 0) {
          await setData(notice);
          console.log('listing notice')
        } else {
          console.log("Empty or invalid data received");
        }

      } catch (error) {
        console.log("err in fetch notice", error);
      }
    };
    event()
  })
  useEffect(() => {
    if (data.length != limit && data.length > limit ) {
      console.log("added");
      setLimit(data.length)
      let message = "0 Notice Available"
      if (Array.isArray(data) && data.length > 0) {
        console.log('listing notice')
        message = data[limit]['message']
      } else {
        console.log("Empty or invalid data received");
      }
      let utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = .8
      utterance.pitch = 1.5;
      utterance.voice = speechSynthesis.getVoices()[1819]
      speechSynthesis.speak(utterance);
      return setLimit(data.length)
    }
  });
  useEffect(() => {
    if (data.length < limit) {
      console.log("removed");
      setLimit(data.length)
    }
  });
  return (
    <div className="flex flex-col-reverse gap-y-4">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="w-full min-h-5 p-4 bg-gray-900/[.8] rounded flex flex-col"
          >
            <p className="bg-black text-red-400 text-[0.8rem] mb-3 tracking-widest font-semibold w-fit p-2 rounded-full">
              @{item.name}
            </p>
            <p className="text-gray-200 text-[1.1rem] ">{item.message}</p>
            <p className="text-right p-3 text-[10px] text-gray-300">
              {item.time}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Notfications;
