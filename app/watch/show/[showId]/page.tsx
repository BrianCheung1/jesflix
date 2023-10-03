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
  const { showId } = useParams()
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
    <div className="h-full bg-black flex flex-wrap">
      <div
        className="absolute w-full flex items-center p-4
        gap-8 bg-black bg-opacity-70"
      >
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          className="text-white cursor-pointer"
          size={30}
        />
      </div>
      <iframe
        id="video"
        className="pt-16 h-screen w-full"
        src={`https://multiembed.mov/directstream.php?video_id=${data?.id}`}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Watch
