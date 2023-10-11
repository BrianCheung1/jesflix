import React, { useState } from "react"

import { BsFillPlayFill } from "react-icons/bs"
import FavoriteButton from "./FavoriteButton"
import { useRouter } from "next/navigation"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import { BiChevronDown } from "react-icons/bi"
import { useSession } from "next-auth/react"
import ShareButton from "./ShareButton"

interface ShowCardProps {
  data: Record<string, any>
}

const ShowCard: React.FC<ShowCardProps> = ({ data }) => {
  const router = useRouter()
  const { openModal } = useShowInfoModal()
  const { data: session } = useSession()

  return (
    <div className="group bg-zinc-900 relative">
      <div className="overflow-hidden h-5/6">
        <img
          onClick={() => {
            openModal(data?.id)
          }}
          loading="lazy"
          placeholder="data:image/poster-placeholder.png"
          className="cursor-pointer object-cover transition ease-in-out duration-300 shadow-xl rounded-t-md w-full h-full hover:scale-110"
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
              router.push(session ? `/watch/show/${data?.id}/1/1` : `/auth`)
            }
          >
            <BsFillPlayFill size={30} />
          </div>
          <FavoriteButton movieId={data?.id} type="show" />
          <ShareButton movieId={data?.id} type="show" />
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

export default ShowCard
