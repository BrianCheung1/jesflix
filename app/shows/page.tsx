"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import ShowList from "@/components/ShowList"
import useTrendingShowList from "@/hooks/useTrendingShowList"
import useGenreShowList from "@/hooks/useGenreShowList"

const Shows = () => {
  const router = useRouter()
  const { data: trendingShows = [], isLoading } = useTrendingShowList()
  const { data: actionShows = [], isLoading: actionLoading } =
    useGenreShowList("action&adventure")
  const { data: animationShows = [], isLoading: animationLoading } =
    useGenreShowList("animation")
  const { data: comedyShows = [], isLoading: comedyLoading } =
    useGenreShowList("comedy")
  const { data: crimeShows = [], isLoading: crimeLoading } =
    useGenreShowList("crime")
  const { data: documentaryShows = [], isLoading: documentaryLoading } =
    useGenreShowList("documentary")
  const { data: dramaShows = [], isLoading: dramaLoading } =
    useGenreShowList("drama")
  const { data: familyShows = [], isLoading: familyLoading } =
    useGenreShowList("family")
  const { data: kidsShows = [], isLoading: kidsLoading } =
    useGenreShowList("kids")
  const { data: mysteryShows = [], isLoading: mysteryLoading } =
    useGenreShowList("mystery")
  const { data: newsShows = [], isLoading: newsLoading } =
    useGenreShowList("news")
  const { data: realityShows = [], isLoading: realityLoading } =
    useGenreShowList("reality")
  const { data: scifiShows = [], isLoading: scifiLoading } =
    useGenreShowList("sci-fi&fantasy")
  const { data: soapShows = [], isLoading: soapLoading } =
    useGenreShowList("soap")
  const { data: talkShows = [], isLoading: talkLoading } =
    useGenreShowList("talk")
  const { data: warShows = [], isLoading: warLoading } =
    useGenreShowList("war&politics")
  const { data: westernShows = [], isLoading: westernLoading } =
    useGenreShowList("western")
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
        <ShowList title="Trending Shows Today" data={trendingShows} />
        <ShowList title="Popular Action & Adventure Shows" data={actionShows} />
        <ShowList title="Popular Animation Shows" data={animationShows} />
        <ShowList title="Popular Comedy Shows" data={comedyShows} />
        <ShowList title="Popular Crime Shows" data={crimeShows} />
        <ShowList title="Popular Documentary Shows" data={documentaryShows} />
        <ShowList title="Popular Drama Shows" data={dramaShows} />
        <ShowList title="Popular Family Shows" data={familyShows} />
        <ShowList title="Popular Kids Shows" data={kidsShows} />
        <ShowList title="Popular Mystery Shows" data={mysteryShows} />
        <ShowList title="Popular News Shows" data={newsShows} />
        <ShowList title="Popular Reality Shows" data={realityShows} />
        <ShowList title="Popular Sci-Fi & Fantasty Shows" data={scifiShows} />
        <ShowList title="Popular Soap Shows" data={soapShows} />
        <ShowList title="Popular Talk Shows" data={talkShows} />
        <ShowList title="Popular War & Politics Shows" data={warShows} />
        <ShowList title="Popular Western Shows" data={westernShows} />
      </div>
    </div>
  )
}

export default Shows
