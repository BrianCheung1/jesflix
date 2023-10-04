import React from "react"

import { BsFillPlayFill } from "react-icons/bs"
import FavoriteButton from "./FavoriteButton"
import { useRouter } from "next/navigation"
import useInfoModal from "@/hooks/useMovieInfoModal"
import { BiChevronDown } from "react-icons/bi"
import Image from "next/image"
import { useSession } from "next-auth/react"
import ShareButton from "./ShareButton"

interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter()
  const { openModal } = useInfoModal()
  const { data: session } = useSession()

  return (
    <div className="group bg-zinc-900 relative">
      <div className="overflow-hidden">
        <img
          onClick={() => {
            openModal(data?.id)
          }}
          loading="lazy"
          placeholder="data:image/poster-placeholder.png"
          className="cursor-pointer object-cover transition ease-in-out duration-300 shadow-xl rounded-t-md w-full h-5/6 hover:scale-110"
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
              : "https://critics.io/img/movies/poster-placeholder.png"
          }
          alt="Thumbnail"
        />
      </div>
      <div className="bg-zinc-800 p-2 lg:p-3 w-full shadow-md rounded-b-md ">
        <div className="flex flex-row items-center">
          <div
            className="cursor-pointer text-white transition hover:scale-125 hover:text-blue-800"
            onClick={() =>
              router.push(session ? `/watch/movie/${data?.id}` : `/auth`)
            }
          >
            <BsFillPlayFill size={30} />
          </div>
          <FavoriteButton movieId={data?.id} type="movie" />
          <ShareButton movieId={data?.id} type="movie" />
          <div
            onClick={() => {
              openModal(data?.id)
            }}
            className="cursor-pointer ml-auto group/item w-6 h-6 flex justify-center items-center transition hover:scale-125"
          >
            <BiChevronDown
              size={30}
              className="text-white hover:text-blue-800 duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
