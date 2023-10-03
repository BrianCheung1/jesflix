"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useFavorites from "@/hooks/useFavorites"
import FavoriteList from "@/components/FavoriteList"
import { isEmpty } from "lodash"
import Footer from "@/components/Footer"

const Favorites = () => {
  const { data: favorites = [], isLoading } = useFavorites()
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
  if (isEmpty(favorites.movies) && isEmpty(favorites.shows)) {
    return (
      <div>
        <Navbar />
        <div className="flex h-screen items-center justify-center text-white">
          <p>Nothing on your list</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="pt-3 flex-1">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
        <FavoriteList data={favorites} />
      </div>
      <Footer />
    </div>
  )
}

export default Favorites
