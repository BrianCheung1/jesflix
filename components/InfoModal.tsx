import React, { useCallback, useEffect, useState, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"

import PlayButton from "./PlayButton"
import FavoriteButton from "./FavoriteButton"
import useMovieInfoModal from "@/hooks/useMovieInfoModal"
import useMovie from "@/hooks/useMovie"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { BiSolidTimeFive } from "react-icons/bi"

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)
  const { movieId } = useMovieInfoModal()
  const { data, isLoading } = useMovie(movieId)

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!isVisible) {
    return null
  }

  if (isLoading) {
    return (
      <div className="z-50 transition duration-30 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0">
        <div className="max-w-3xl rounded-md overflow-hidden">
          <div
            className={`${isVisible} ? 'scale-100': 'scale-0' transform duration-300 relative flex bg-zinc-900 drop-shadow-md `}
          >
            <div className="h-96 w-screen animate-pulse justify-center items-center flex">
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full"
                role="status"
                aria-label="loading"
              ></div>
              <div
                className="cursor-pointer top-3 right-3 absolute"
                onClick={handleClose}
              >
                <AiOutlineClose className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="z-50 transition duration-30 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0">
        <div className="relative w-full mx-auto max-w-3xl rounded-md overflow-hidden">
          <div
            className={
              isVisible
                ? "transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md scale-100"
                : "scale-0"
            }
          >
            <div className="relative">
              <video
                className="brightness-[60%] object-cover h-full"
                autoPlay
                muted
                loop
                poster={
                  data?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
                    : "/images/placeholder.png"
                }
                // src={`https://www.youtube.com/watch?v=${video}`}
              ></video>
              <div
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                onClick={handleClose}
              >
                <AiOutlineClose className="text-white" size={20} />
              </div>
              <div className="absolute bottom-[10%] left-10">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-4">
                  {data?.title}
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton movieId={data?.id} type="movie" />
                  <FavoriteButton movieId={data?.id} type="movie" />
                </div>
              </div>
            </div>
            <div className="px-4 py-2 pt-6 flex flex-row flex-wrap gap-2 items-center justify-start">
              <p className="text-green-400">
                <BsFillCalendarFill size={15} />
              </p>
              <p className="text-white font-semibold text-1xl">
                {data?.release_date}
              </p>
              <p className="text-green-400">
                <AiFillStar size={20} />
              </p>
              <p className="text-white font-semibold text-1xl">
                {data?.vote_average.toFixed(1)}
              </p>
              <p className="text-green-400">
                <BiSolidTimeFive size={20} />
              </p>
              <p className="text-white font-semibold text-1xl">
                {Math.floor(data?.runtime / 60)}h {data?.runtime % 60}m
              </p>
            </div>
            <div className="px-4 py-4 pb-6">
              <p className="text-white text-1xl">{data?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoModal
