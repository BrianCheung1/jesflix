"use client"

import useMovie from "@/hooks/useMovie"
import { useSession } from "next-auth/react"
import { redirect, useParams, useRouter } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai"

const Watch = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin")
    },
  })
  const router = useRouter()
  const { movieId } = useParams()
  const { data } = useMovie(movieId as string)
  const video = data?.videos?.results?.filter(
    (result: any) => result.type == "Trailer"
  )[0]["key"]

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
          src={`https://multiembed.mov/?video_id=${data?.id}&tmdb=1`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Watch
