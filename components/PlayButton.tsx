import React from "react"

import { BsFillPlayFill } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

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
  const { data: session } = useSession()

  if (type === "movie") {
    return (
      <button
        onClick={() =>
          router.push(session ? `/watch/movie/${movieId}` : `/auth`)
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
    hover:scale-110
    transition
    hover:text-blue-800
    duration-300
    "
      >
        <BsFillPlayFill size={20} className="mr-1" />
        Play
      </button>
    )
  }
  return (
    <button
      onClick={() =>
        router.push(
          session ? `/watch/show/${movieId}/${season}/${episode}` : `/auth`
        )
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
  transition
  hover:scale-110
  hover:text-blue-800
  duration-300"
    >
      <BsFillPlayFill size={20} className="mr-1" />
      Play
    </button>
  )
}

export default PlayButton
