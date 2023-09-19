import React, { useCallback, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

import PlayButton from "./PlayButton"
import FavoriteButton from "./FavoriteButton"
import useInfoModal from "@/hooks/useInfoModal"
import useMovie from "@/hooks/useMovie"

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)
  const { movieId } = useInfoModal()
  const { data, isLoading } = useMovie(movieId)

  const video = data?.videos?.results?.filter(
    (result: any) => result.type == "Trailer"
  )[0]["key"]
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
  return (
    <div className="z-50 transition duraiton-30 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overlfow-hidden">
        <div
          className={`${isVisible} ? 'scale-=100': 'scale-0' transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
              src={`https://www.youtube.com/watch?v=${video}`}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-4 py-2 pt-6 flex flex-row gap-2 items-center justify-start">
            {/* <p className="text-green-400 font-sembold text-1xl">New</p> */}
            {/* <p className="text-white font-sembold text-1xl">{data?.overiew}</p> */}
            <p className="text-white font-sembold text-1xl">
              {data?.release_date}
            </p>
            <p className="text-white font-sembold text-1xl">
              {data?.vote_average}
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

export default InfoModal
