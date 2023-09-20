"use client"

import { useSession } from "next-auth/react"
import { redirect, useParams, useRouter } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai"
import useShow from "@/hooks/useShow"

const Watch = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin")
    },
  })
  const router = useRouter()
  const { showId, season, episode } = useParams()
  const { data, isLoading } = useShow(showId as string)

  if (isLoading) {
    return (
      <div className="animate-pulse text-white w-full h-full flex justify-center items-center">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-end">
      <div
        className="
         w-full p-4 z-10 
         items-center 
        gap-8 bg-black bg-opacity-70
      "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={30}
        />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <iframe
          id="video"
          className="h-full w-full"
          src={`https://multiembed.mov/?video_id=${data?.id}&tmdb=1&s=${season}&e=${episode}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Watch
