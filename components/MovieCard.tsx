import React from "react"

import { BsFillPlayFill } from "react-icons/bs"
import FavoriteButton from "./FavoriteButton"
import { useRouter } from "next/navigation"
import useInfoModal from "@/hooks/useInfoModal"
import { BiChevronDown } from "react-icons/bi"

interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter()
  const { openModal } = useInfoModal()

  return (
    <div className="group bg-zinc-900 relative">
      <img
        onClick={() => {
          openModal(data?.id)
        }}
        className="cursor-pointer object-cover transition duraiton shadow-xl rounded-t-md w-full "
        src={
          data?.poster_path
            ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
            : "https://critics.io/img/movies/poster-placeholder.png"
        }
        alt="Thumbnail"
      />
      <div className="bg-zinc-800 p-2 lg:p-4 w-full shadow-md rounded-b-md ">
        <div className="flex flex-row items-center gap-3">
          <div
            className="cursor-pointer text-white transition"
            onClick={() => router.push(`/watch/movie/${data?.id}`)}
          >
            <BsFillPlayFill size={30} />
          </div>
          <FavoriteButton movieId={data?.id} type="movie" />
          <div
            onClick={() => {
              openModal(data?.id)
            }}
            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
          >
            <BiChevronDown
              size={30}
              className="text-white gorup-hover/item:text-neutral-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
