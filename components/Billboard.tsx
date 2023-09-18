import useBillboard from "@/hooks/useBillboard"
import React, { useCallback } from "react"

import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "./PlayButton"
import useInfoModal from "@/hooks/useInfoModal"
const Billboard = () => {
  const { data } = useBillboard()
  const { openModal } = useInfoModal()
  const video = data?.videos?.results?.filter(
    (result: any) => result.type == "Trailer"
  )[0]["key"]
  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  return (
    <div className="relative h-[65vw]">
      <iframe
        className="w-full h-[65vw] object-cover brightness-[60%]"
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&vq=hd1080&controls=0&loop=1`}
      ></iframe>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-3xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[16px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.overview}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" size={25} />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard
