import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
function Notfications() {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const event = async () => {
      try {
        const res = await fetch(`/api/notice`,{
          method:"PUT",
        });
        if (!res.ok) {
          return new Error("can't fetch notice");
        }
        const { notice } = await res.json();
        if (Array.isArray(notice) && notice.length > 0) {
          await setData(notice);
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
    if (data.length != limit && data.length > limit) {
      console.log("added");
      setLimit(data.length)
      let message = "0 Notice Available"
      if (Array.isArray(data) && data.length > 0) {
        message = data[limit]['message']
      } else {
        console.log("Empty or invalid data received");
      }
      // let utterance = new SpeechSynthesisUtterance(message);
      // utterance.lang = "en"
      // utterance.pitch = 0
      // utterance.rate = .8
      // speechSynthesis.speak(utterance);
      fetch(`https://api.lmnt.com/v1/ai/speech?X-API-Key=e3c8ccf5f6da4fe1ac57ad35aeb63181&voice=daniel&text=${message}`)
        .then(response => response.arrayBuffer())
        .then(response => {
          const blob = new Blob([response], { type: "audio/mpeg" })
          const url = URL.createObjectURL(blob);
          const player = document.createElement('audio');
          player.src = url;
          player.play()
        })
        .catch(err => console.error(err));
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
      <AnimatePresence mode="wait">
        {data.map((item) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: .5, type: 'tween' }}

              key={item._id}
              className="w-full min-h-5 p-4 bg-white rounded flex flex-col shadow"
            >
              <p className="bg-gray-200 text-orange-400 text-[0.8rem] mb-3 tracking-widest font-semibold w-fit p-2 rounded-full">
                @{item.name}
              </p>
              <p className="text-purple-600 text-[1.1rem] ">{item.message}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default Notfications;
