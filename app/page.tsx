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
import useInfoModal from "@/hooks/useInfoModal"
import useTrendingList from "@/hooks/useTrendingList"
import useBillboard from "@/hooks/useBillboard"

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
  const { data: trending = [], isLoading } = useTrendingList()
  const { isOpen, closeModal } = useInfoModal()
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
        <Navbar />
        <Billboard />
        <div className="pb-40">
          <MovieList title="My List" data={favorites} />
          <MovieList title="Trending Movies" data={trending} />
          <MovieList title="Trending Shows" data={trending} />
        </div>
      </>
    )
  }
}

export default Home
