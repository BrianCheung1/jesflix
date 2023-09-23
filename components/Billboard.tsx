import useBillboard from "@/hooks/useBillboard"
import React, { useCallback } from "react"

import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "./PlayButton"
import useInfoModal from "@/hooks/useMovieInfoModal"
const Billboard = () => {
  const { data } = useBillboard()
  const { openModal } = useInfoModal()
  let video = data?.videos?.results?.find(
    (result: any) => result.type == "Trailer"
  )
  video =
    "key" in video
      ? data?.videos?.results?.find((result: any) => result.type == "Trailer")["key"]
      : null
  // if (video[0]) {
  //   video = video[0]
  // }
  console.log(video)
  // if ("key" in video) {
  //   video = video["key"]
  // }
  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  return (
    <div className="relative flex items-center h-screen mb-12 pt-24">
      <iframe
        className="w-full h-screen object-cover brightness-[60%] pointer-events-none"
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&vq=hd1080&controls=0&modestbranding=1&showinfo=0&loop=1&playlist=${video}`}
      ></iframe>

      <div className="absolute ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} type="movie" />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" size={20} />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard
