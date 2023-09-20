"use client"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { NextPageContext } from "next"
import { redirect } from "next/navigation"
import useCurrentUser from "@/hooks/useCurrentUser"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useTrendingMovieList from "@/hooks/useTrendingMovieList"
import useBillboard from "@/hooks/useBillboard"
import useShowList from "@/hooks/useShowList"
import ShowList from "@/components/ShowList"
import FavoriteList from "@/components/FavoriteList"

const Home = () => {
  const { data: user } = useCurrentUser()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { data: trending = [], isLoading } = useTrendingMovieList()
  const { data: trendingShows = [], isLoading: isLoadingShows } = useShowList()
  const { isOpen, closeModal } = useInfoModal()
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal()
  const { isLoading: isBillBoardLoading } = useBillboard()

  if (isLoading || isBillBoardLoading) {
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
        <div className="pb-40">
          <FavoriteList title="Favorites" data={favorites} />
          <MovieList title="Trending Movies Today" data={trending} />
          <ShowList title="Trending Shows Today" data={trendingShows} />
        </div>
      </>
    )
  }
}

export default Home
