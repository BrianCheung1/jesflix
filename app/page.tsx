"use client"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useTrendingMovieList from "@/hooks/useTrendingMovieList"
import useBillboard from "@/hooks/useBillboard"
import useTrendingShowList from "@/hooks/useTrendingShowList"
import ShowList from "@/components/ShowList"
import useSimilarMoviesList from "@/hooks/useSimiliarMovieList"
import useSimiliarShowList from "@/hooks/useSimiliarShowList"
import Footer from "@/components/Footer"

const Home = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })

  const { data: trendingMovies = [], isLoading } = useTrendingMovieList()
  const { data: trendingShows = [], isLoading: isLoadingShows } =
    useTrendingShowList()
  const { data: similarMovies = [], isLoading: isLoadingSimilarMovies } =
    useSimilarMoviesList()
  const { data: similarShows = [], isLoading: isLoadingSimilarShows } =
    useSimiliarShowList()
  const { isOpen, closeModal } = useInfoModal()
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal()
  const { isLoading: isBillBoardLoading } = useBillboard()

  if (session) {
    if (
      isLoading ||
      isBillBoardLoading ||
      isLoadingShows ||
      isLoadingSimilarMovies ||
      isLoadingSimilarShows
    ) {
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
    } else {
      return (
        <>
          <InfoModal visible={isOpen} onClose={closeModal} />
          <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
          <Navbar />
          <Billboard />
          <div className="pt-5">
            <MovieList
              title={`Because ${similarMovies.choice.title} is in your favorites`}
              data={similarMovies.results}
            />
            <ShowList
              title={`Because ${similarShows?.choice?.name} is in your favorites`}
              data={similarShows.results}
            />
            <MovieList title="Trending Movies Today" data={trendingMovies} />
            <ShowList title="Trending Shows Today" data={trendingShows} />
          </div>
          <Footer/>
        </>
      )
    }
  } else {
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
}

export default Home
