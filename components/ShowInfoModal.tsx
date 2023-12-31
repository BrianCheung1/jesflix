import React, { useCallback, useEffect, useState, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import PlayButton from "./PlayButton"
import FavoriteButton from "./FavoriteButton"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useShow from "@/hooks/useShow"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import ShareButton from "./ShareButton"
import InfoButton from "./InfoButton"
import GenreList from "./GenreList"

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const ShowInfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)
  const { showId } = useShowInfoModal()
  const { data, isLoading } = useShow(showId)
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)
  const ref = useRef<any>()

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setSeason(0)
    setEpisode(0)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    setIsVisible(!!visible)
    const handleOutSideClick = (event: any) => {
      if (ref.current === event.target) {
        handleClose()
      }
    }
    window.addEventListener("mousedown", handleOutSideClick)
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [visible, ref, handleClose])


  const handleEpisodeChange = (e: any) => {
    setEpisode(Number(e.target.value))
  }

  const handleSeasonsChange = (e: any) => {
    setSeason(Number(e.target.value))
  }

  const renderSeasons = () => {
    const listItems = []
    for (let i = 0; i < data?.number_of_seasons; i++) {
      listItems.push(
        <option className="block py-2 px-4 hover:bg-gray-100" value={i}>
          Season {i + 1}
        </option>
      )
    }
    return listItems
  }

  const renderEpisodes = () => {
    const listItems = []
    const seasons = data?.seasons.filter((season: any) => {
      return season.season_number >= 1
    })
    for (let i = 0; i < seasons[season]?.episode_count; i++) {
      listItems.push(
        <option className="block py-2 px-4 hover:bg-gray-100" value={i}>
          Episode {i + 1}
        </option>
      )
    }
    return listItems
  }

  if (!isVisible) {
    return null
  }

  if (isLoading) {
    return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-y-auto no-scrollbar fixed inset-0">
        <div className="max-w-3xl rounded-md overflow-hidden">
          <div
            className={`${
              isVisible ? "scale-100" : "scale-0"
            } transform duration-300 relative flex bg-zinc-900 drop-shadow-md `}
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
      <div
        ref={ref}
        className="z-50 transition duration-300 bg-black bg-opacity-80 flex flex-wrap justify-center items-center fixed inset-0 overflow-y-auto no-scrollbar"
      >
        <div className="w-full max-w-3xl mx-auto rounded-md">
          <div
            className={`${
              isVisible ? "scale-100" : "scale-0"
            } transform duration-300 flex-auto bg-zinc-900 drop-shadow-md `}
          >
            <div className="relative">
              <video
                className="brightness-[60%]"
                autoPlay
                muted
                loop
                poster={
                  data?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
                    : `/images/placeholder.png`
                }
              ></video>
              <div
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                onClick={handleClose}
              >
                <AiOutlineClose className="text-white" size={20} />
              </div>
              <div className="absolute bottom-[10%] left-10">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-1">
                  {data?.name ? data?.name : data?.original_name}
                </p>
                <p className="text-xs text-neutral-400 font-semibold mb-4">
                  {data?.tagline ? `"${data?.tagline}"` : null}
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton
                    movieId={data?.id}
                    type="show"
                    episode={episode + 1}
                    season={season + 1}
                  />
                  <FavoriteButton movieId={data?.id} type="show" />
                  <ShareButton movieId={data?.id} type="show" />
                  <InfoButton movieId={data?.id} type="show" />
                </div>
              </div>
            </div>
            <div className="px-4 py-2 pt-6 flex flex-row flex-wrap gap-2 items-center justify-start">
              <p className="text-green-400">
                <BsFillCalendarFill size={15} />
              </p>
              <p className="text-white font-semibold text-sm">
                {data?.first_air_date}
              </p>
              <p className="text-green-400">
                <AiFillStar size={20} />
              </p>
              <p className="text-white font-semibold text-sm">
                {data?.vote_average.toFixed(1)}
              </p>
              <div className="flex flex-wrap gap-2">
                <select
                  onChange={handleSeasonsChange}
                  id="Seasons"
                  className="text-white bg-neutral-700 rounded-lg text-sm px-2 py-1 text-center flex items-center"
                >
                  <option selected>Choose a season</option>
                  {renderSeasons()}
                </select>
              
                <select
                  onChange={handleEpisodeChange}
                  id="Episodes"
                  className="text-white bg-neutral-700 rounded-lg text-sm px-2 py-1 text-center flex items-center"
                >
                  <option selected>Choose an episode</option>
                  {renderEpisodes()}
                </select>
              </div>
            </div>
            <div className="px-4 py-1 pb-4 ">
              <p className="text-white text-lg">{data?.overview}</p>
            </div>

            <div className="px-4 pb-6">
              <p className="text-white text-sm"><GenreList data={data}/></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowInfoModal
