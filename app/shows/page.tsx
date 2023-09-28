"use client"
import {useState} from 'react'
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
  const [actionPage, setActionPage] = useState(1);
  const [adventurePage, setAdventurePage] = useState(1);
  const [animationPage, setAnimationPage] = useState(1);
  const [comedyPage, setComedyPage] = useState(1);
  const [crimePage, setCrimePage] = useState(1);
  const [documentaryPage, setDocumentaryPage] = useState(1);
  const [dramaPage, setDramaPage] = useState(1);
  const [familyPage, setFamilyPage] = useState(1);
  const [kidsPage, setKidsPage] = useState(1);
  const [mysteryPage, setMysteryPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);
  const [realityPage, setRealityPage] = useState(1)
  const [scifiPage, setScifiPage] = useState(1);
  const [soapPage, setSoapPage] = useState(1)
  const [talkPage, setTalkPage] = useState(1)
  const [warPage, setWarPage] = useState(1);
  const [westernPage, setWesternPage] = useState(1);

  const router = useRouter()
  const { data: trendingShows = [], isLoading } = useTrendingShowList()
  const { data: actionShows = [], isLoading: actionLoading } =
    useGenreShowList("10759", String(actionPage))
  const { data: animationShows = [], isLoading: animationLoading } =
    useGenreShowList("16", String(animationPage))
  const { data: comedyShows = [], isLoading: comedyLoading } =
    useGenreShowList("35", String(comedyPage))
  const { data: crimeShows = [], isLoading: crimeLoading } =
    useGenreShowList("80", String(crimePage))
  const { data: documentaryShows = [], isLoading: documentaryLoading } =
    useGenreShowList("99", String(documentaryPage))
  const { data: dramaShows = [], isLoading: dramaLoading } =
    useGenreShowList("18", String(dramaPage))
  const { data: familyShows = [], isLoading: familyLoading } =
    useGenreShowList("10751", String(familyPage))
  const { data: kidsShows = [], isLoading: kidsLoading } =
    useGenreShowList("10762", String(kidsPage))
  const { data: mysteryShows = [], isLoading: mysteryLoading } =
    useGenreShowList("9648", String(mysteryPage))
  const { data: newsShows = [], isLoading: newsLoading } =
    useGenreShowList("10763", String(newsPage))
  const { data: realityShows = [], isLoading: realityLoading } =
    useGenreShowList("10764", String(realityPage))
  const { data: scifiShows = [], isLoading: scifiLoading } =
    useGenreShowList("10765", String(scifiPage))
  const { data: soapShows = [], isLoading: soapLoading } =
    useGenreShowList("10766", String(soapPage))
  const { data: talkShows = [], isLoading: talkLoading } =
    useGenreShowList("10767", String(talkPage))
  const { data: warShows = [], isLoading: warLoading } =
    useGenreShowList("10768", String(warPage))
  const { data: westernShows = [], isLoading: westernLoading } =
    useGenreShowList("37", String(westernPage))
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
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setActionPage(actionPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Animation Shows" data={animationShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setAnimationPage(animationPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Comedy Shows" data={comedyShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setComedyPage(comedyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Crime Shows" data={crimeShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setCrimePage(crimePage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Documentary Shows" data={documentaryShows} />
        <button
            onClick={() => setDocumentaryPage(documentaryPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Drama Shows" data={dramaShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setDramaPage(dramaPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Family Shows" data={familyShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setFamilyPage(familyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Kids Shows" data={kidsShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setKidsPage(kidsPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Mystery Shows" data={mysteryShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setMysteryPage(mysteryPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular News Shows" data={newsShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setNewsPage(newsPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Reality Shows" data={realityShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setRealityPage(realityPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Sci-Fi & Fantasty Shows" data={scifiShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setScifiPage(scifiPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Soap Shows" data={soapShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setSoapPage(soapPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Talk Shows" data={talkShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setTalkPage(talkPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular War & Politics Shows" data={warShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setWarPage(warPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <ShowList title="Popular Western Shows" data={westernShows} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setWesternPage(westernPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
      </div>
   
  )
}

export default Shows
