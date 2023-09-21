import React, { useCallback, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

import PlayButton from "./PlayButton"
import FavoriteButton from "./FavoriteButton"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useShow from "@/hooks/useShow"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { BiSolidTimeFive } from "react-icons/bi"

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const ShowInfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)
  const { movieId } = useShowInfoModal()
  const { data, isLoading } = useShow(movieId)
  const [isOpen, setOpen] = useState(false)
  const [isOpenEps, setOpenEps] = useState(false)
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)

  const handleDropDown = () => {
    setOpen(!isOpen)
    if (isOpenEps) {
      setOpenEps(false)
    }
  }
  const handleDropDownEps = () => {
    setOpenEps(!isOpenEps)
    if (isOpen) {
      setOpen(false)
    }
  }

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setOpen(false)
    setOpenEps(false)
    setSeason(0)
    setEpisode(0)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  const renderSeasons = () => {
    const listItems = []
    for (let i = 0; i < data?.number_of_seasons; i++) {
      listItems.push(
        <li
          onClick={() => setSeason(i)}
          className="block py-2 px-4 hover:bg-gray-100"
          key={i}
        >
          Season {i + 1}
        </li>
      )
    }
    return listItems
  }

  const renderEpisodes = () => {
    const listItems = []
    for (let i = 0; i < data?.seasons[season].episode_count; i++) {
      listItems.push(
        <li
          onClick={() => setEpisode(i)}
          className="block py-2 px-4 hover:bg-gray-100"
          key={i}
        >
          Episode {i + 1}
        </li>
      )
    }
    return listItems
  }

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
        <div className="relative w-auto mx-auto max-w-3xl rounded-md overlfow-hidden">
          <div
            className={`${isVisible} ? 'scale-100': 'scale-0' transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
          >
            <div className="relative h-96">
              <video
                className="w-full brightness-[60%] object-cover h-full"
                autoPlay
                muted
                loop
                poster={
                  data?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
                    : "https://critics.io/img/movies/poster-placeholder.png"
                }
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
                  <PlayButton
                    movieId={data?.id}
                    type="show"
                    episode={episode + 1}
                    season={season + 1}
                  />
                  <FavoriteButton movieId={data?.id} type="show" />
                </div>
              </div>
            </div>
            <div className="px-4 py-2 pt-6 flex flex-row gap-2 items-center justify-start">
              <p className="text-green-400">
                <BsFillCalendarFill size={15} />
              </p>
              <p className="text-white font-semibold text-1xl">
                {data?.first_air_date}
              </p>
              <p className="text-green-400">
                <AiFillStar size={20} />
              </p>
              <p className="text-white font-semibold text-1xl">
                {data?.vote_average.toFixed(1)}
              </p>
              <div>
                <button
                  className="text-white bg-blue-700 rounded-lg text-sm px-2 py-1 text-center flex items-center"
                  onClick={handleDropDown}
                >
                  Seasons
                </button>

                <div
                  id="dropdown"
                  className={`absolute h-44 w-44 overflow-y-auto bg-white rounded divide-y divide-gray-100 shadow ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className=" bg-white divide-gray-100 shadow ">
                    {renderSeasons()}
                  </ul>
                </div>
              </div>
              <div>
                <button
                  className="text-white bg-blue-700 rounded-lg text-sm px-2 py-1 text-center flex items-center"
                  onClick={handleDropDownEps}
                >
                  Episode
                </button>

                <div
                  id="dropdownEps"
                  className={`absolute h-44 w-44 overflow-y-auto bg-white rounded divide-y divide-gray-100 shadow ${
                    isOpenEps ? "block" : "hidden"
                  }`}
                >
                  <ul className=" bg-white divide-gray-100 shadow ">
                    {renderEpisodes()}
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-4 py-1 pb-4">
              <p className="text-white text-1xl">{data?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowInfoModal
