"use client"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import useShow from "@/hooks/useShow"
import PlayButton from "@/components/PlayButton"
import FavoriteButton from "@/components/FavoriteButton"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import ShareButton from "@/components/ShareButton"
import { useState } from "react"

const Show = () => {
  const { showId } = useParams()
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)
  const { data, isLoading } = useShow(showId as string)
  const { data: session } = useSession()

  const renderGenres = () => {
    const genres = data?.genres
      ?.map((genre: any) => {
        return genre.name
      })
      .join(", ")
    console.log(genres)
    return genres
  }

  const renderCast = () => {
    const listItems = []
    const cast = data?.credits?.cast
    for (let i = 0; i < data?.credits?.cast?.length; i++) {
      listItems.push(`${cast[i]?.name} as ${cast[i]?.character}`)
    }

    return listItems.join(", ")
  }

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

  if (isLoading) {
    return (
      <div className="animate-pulse text-white w-full h-full flex justify-center items-center ">
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
    <div
      className="justify-center items-center bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
      }}
    >
      <div className="bg-black bg-opacity-50">
        <Navbar />
        <div className="h-full w-full flex items-center justify-start pt-32">
          <div className="flex flex-col mx-16 gap-4 lg:w-1/3 w-5/6">
            <p className="text-white text-4xl md:text-6xl h-full lg:text-8xl font-bold drop-shadow-xl ">
              {data?.name}
              <p className="text-xs text-neutral-400 font-semibold mb-4">
                {data?.tagline ? `"${data?.tagline}"` : null}
              </p>
            </p>
            <div className="flex items-center gap-4">
              <PlayButton
                movieId={data?.id}
                type="show"
                episode={episode + 1}
                season={season + 1}
              />
              <FavoriteButton movieId={data?.id} type="show" />
              <ShareButton movieId={data?.id} type="show" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <select
                  onChange={handleSeasonsChange}
                  id="Seasons"
                  className="text-white bg-neutral-700 rounded-lg text-sm px-2 py-1 text-center flex items-center"
                >
                  <option selected>Choose a season</option>
                  {renderSeasons()}
                </select>
              </div>
              <div>
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
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <p className="text-green-400">
                  <BsFillCalendarFill size={15} />
                </p>
                <p className="text-white font-semibold md:text-xl text-sm">
                  {data?.first_air_date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-green-400">
                  <AiFillStar size={20} />
                </p>
                <p className="text-white font-semibold md:text-xl text-sm">
                  {data?.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="flex text-white h-auto pb-44">{data?.overview}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Genre
            </div>
            <div className="text-white">{renderGenres()}</div>
          </div>

          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Homepage
            </div>
            <div className="text-white">
              <a href={data?.homepage}>{data?.homepage}</a>
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Spoken Languages
            </div>
            <div className="text-white">
              {data?.spoken_languages
                .map((language: any) => language.english_name)
                .join(", ")}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Production Companies
            </div>
            <div className="text-white">
              {data?.production_companies
                .map((company: any) => company.name)
                .join(", ")}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">Ids</div>
            <div className="text-white">TMDB ID: {data?.id}</div>
            <div className="text-white">IMDB ID: {data?.imdb_id}</div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Production Countries
            </div>
            <div className="text-white">
              {data?.production_countries
                .map((country: any) => country.name)
                .join(", ")}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Networks
            </div>
            <div className="text-white">
              {data?.networks.map((network: any) => network.name).join(", ")}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">
              Seasons/Episodes
            </div>
            <div className="text-white">Seasons: {data?.number_of_seasons}</div>
            <div className="text-white">
              Episodes: {data?.number_of_episodes}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mx-16 mb-4">
            <div className="mr-32 md:text-3xl text-xl text-slate-400">Cast</div>
            <div className="text-white">{renderCast()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Show
