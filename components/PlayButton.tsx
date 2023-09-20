import React from "react"

import { BsFillPlayFill } from "react-icons/bs"
import { useRouter } from "next/navigation"

interface PlayButtonProps {
  movieId: string
  type: string
  season?: any
  episode?: any
}

const PlayButton: React.FC<PlayButtonProps> = ({
  movieId,
  type,
  season,
  episode,
}) => {
  const router = useRouter()

  if (type === "movie") {
    return (
      <button
        onClick={() => router.push(`/watch/movie/${movieId}`)}
        className="bg-white
    rounded-md
    py-1
    md:py-2
    px-2
    md:px-4
    w-auto
    text-xs lg:text-lg
    font-semibold
    flex
    flex-row
    items-center
    hover:bg-neutral-300
    transition"
      >
        <BsFillPlayFill size={20} className="mr-1" />
        Play
      </button>
    )
  }
  return (
    <button
      onClick={() =>
        router.push(`/watch/show/${movieId}/${season}/${episode}`)
      }
      className="bg-white
  rounded-md
  py-1
  md:py-2
  px-2
  md:px-4
  w-auto
  text-xs lg:text-lg
  font-semibold
  flex
  flex-row
  items-center
  hover:bg-neutral-300
  transition"
    >
      <BsFillPlayFill size={20} className="mr-1" />
      Play
    </button>
  )
}

export default PlayButton
