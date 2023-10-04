"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import ShowList from "@/components/ShowList"
import useTopMovie from "@/hooks/useTopMovie"
import MovieList from "@/components/MovieList"
import useTopShow from "@/hooks/useTopShow"
import Footer from "@/components/Footer"

const Shows = () => {
  const router = useRouter()
  const { data, isLoading } = useTopMovie()
  const { data: topShows, isLoading: showsLoading } = useTopShow()
  const { isOpen, closeModal } = useInfoModal()
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })
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
    <div>
      <Navbar />
      <div className="pt-10">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
        <MovieList
          title="Top Rated Movies "
          data={data}
          isLoading={isLoading}
        />
        <ShowList
          title="Top Rated Shows"
          data={topShows}
          isLoading={showsLoading}
        />
      </div>
      <Footer />
    </div>
  )
}

export default Shows
