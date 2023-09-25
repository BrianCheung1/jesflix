"use client"
import MovieList from "@/components/MovieList"
import useSearchList from "@/hooks/useSearch"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import SearchList from "@/components/SearchList"
import { isEmpty } from "lodash"

const Search = () => {
  const router = useRouter()
  const { query } = useParams()
  const { data: results = [], isLoading } = useSearchList(query as string)
  const { isOpen, closeModal } = useInfoModal()
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })
  function title(str: string) {
    return str.replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase()
    })
  }

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
  if (isEmpty(results.movies) && isEmpty(results.shows)) {
    return (
      <div>
        <Navbar />
        <div className="flex h-screen items-center justify-center text-white">
          <p>No results please try another query</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
      <div className="flex items-center h-full justify-center pt-5">
        <SearchList
          title={`Search results for ${title(
            (query as string).replaceAll("%20", " ")
          )}`}
          data={results}
        />
      </div>
    </div>
  )
}

export default Search
