"use client"

import { useSession } from "next-auth/react"
import { redirect, useParams, useRouter } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai"
import useShow from "@/hooks/useShow"
import { BiSkipNext } from "react-icons/bi"

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

  const load_next_eps = () => {
    let number_of_seasons = data?.seasons?.filter((season: any) => {
      return season.season_number >= 1
    })[Number(season) - 1]
    if (Number(episode) + 1 > number_of_seasons?.episode_count) {
      router.push(`/watch/show/${data?.id}/${Number(season) + 1}/1`)
    } else {
      router.push(`/watch/show/${data?.id}/${season}/${Number(episode) + 1}`)
    }
  }

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
        gap-8 bg-black bg-opacity-70 "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer 
            transition
            hover:text-blue-800
            hover:scale-150"
          size={30}
        />
        <div className="ml-auto">
          <button
            onClick={() => load_next_eps()}
            className="bg-white
    rounded-md
    py-1
    px-2
    md:px-4
    w-auto
    text-xs lg:text-lg
    font-semibold
    flex
    flex-row
    items-center
    hover:scale-110
    transition
    hover:text-blue-800
    "
          >
            <BiSkipNext size={25} />
            Next Episode
          </button>
        </div>
      </div>
      <iframe
        id="video"
        className="pt-16 h-screen w-full"
        src={`https://multiembed.mov/directstream.php?video_id=${data?.id}&tmdb=1&s=${season}&e=${episode}`}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Watch
