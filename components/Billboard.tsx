import useBillboard from "@/hooks/useBillboard"
import React, { useCallback } from "react"

import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "./PlayButton"
import useInfoModal from "@/hooks/useMovieInfoModal"
import ShareButton from "./ShareButton"
const Billboard = () => {
  const { data, isLoading } = useBillboard()
  const { openModal } = useInfoModal()
  let video = data?.videos?.results?.find(
    (result: any) => result.type == "Trailer"
  )
  if (video) {
    video = "key" in video ? video["key"] : null
  }
  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

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
    <div className="relative flex items-center h-screen mb-12 pt-24">
      <iframe
        className="w-full h-screen object-cover brightness-[60%] pointer-events-none"
        src={
          video
            ? `https://www.youtube.com/embed/${video}?autoplay=1&mute=1&vq=hd1080&&controls=0&modestbranding=1&showinfo=0&&rel=0loop=1&disablekb=1&playlist=${video}`
            : `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
        }
        title="Youtube app player"
      ></iframe>

      <div className="absolute ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} type="movie" />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transitionhover:scale-110"
          >
            <AiOutlineInfoCircle className="mr-1 " size={20} />
            More Info
          </button>
          <ShareButton movieId={data?.id} type="movie" />
        </div>
      </div>
    </div>
  )
}

export default Billboard
