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
      {/* <img
        className="cursor-pointer object-cover transition duration-200 shadow-xl rounded group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]"
        src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
        alt="Thumbnail"
      /> */}

      {/* <div className="opactiy-0 absolute top-0 transition duration-200 z-10 invisible sm:visible  w-full scale-0 group-hover:scale-100 group-hover:-translate-y-[6vw] group:hover:translate-x-[2vw]  group-hover:opacity-100"> */}
      <img
        onClick={() => {
          openModal(data?.id)
        }}
        className="cursor-pointer object-cover transition duraiton shadow-xl rounded-t-md w-full "
        src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
        alt="Thumbnail"
      />
      <div className="bg-zinc-800 p-2 lg:p-4 w-full shadow-md rounded-b-md ">
        <div className="flex flex-row items-center gap-3">
          <div
            className="cursor-pointer text-white transition"
            onClick={() => router.push(`/watch/${data?.id}`)}
          >
            <BsFillPlayFill size={30} />
          </div>
          <FavoriteButton movieId={data?.id} />
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

        {/* <p className="text-green-400 font-semibold mt-4">{data?.title}</p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.overview}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data?.genre}</p>
          </div> */}
      </div>
    </div>
    // </div>
  )
}

export default MovieCard
