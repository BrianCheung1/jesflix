"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import useShow from "@/hooks/useShow"
import PlayButton from "@/components/PlayButton"
import FavoriteButton from "@/components/FavoriteButton"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { BiSolidTimeFive } from "react-icons/bi"
import ShareButton from "@/components/ShareButton"

const Show = () => {
  const { showId } = useParams()
  const router = useRouter()
  const { data, isLoading } = useShow(showId as string)
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })

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
        <div className="h-full w-full  flex items-center justify-start pt-32">
          <div className="flex flex-col mx-16 gap-4 w-1/3">
            <p className="text-white text-4xl md:text-6xl h-full lg:text-8xl font-bold drop-shadow-xl ">
              {data?.name}
              <p className="text-xs text-neutral-400 font-semibold mb-4">
                {data?.tagline ? `"${data?.tagline}"` : null}
              </p>
            </p>
            <div className="flex items-center gap-4">
              <PlayButton movieId={data?.id} type="movie" />
              <FavoriteButton movieId={data?.id} type="movie" />
              <ShareButton movieId={data?.id} type="movie" />
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
            <div className="flex text-white h-96">{data?.overview}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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