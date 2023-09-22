"use client"
import MovieList from "@/components/MovieList"
import { useSession } from "next-auth/react"
import { redirect, useRouter, useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import InfoModal from "@/components/InfoModal"
import ShowInfoModal from "@/components/ShowInfoModal"
import useInfoModal from "@/hooks/useMovieInfoModal"
import useShowInfoModal from "@/hooks/useShowInfoModal"
import useTrendingMovieList from "@/hooks/useTrendingMovieList"
import useGenreMovieList from "@/hooks/useGenreMovieList"

const Movies = () => {
  const { data: trendingMovies = [], isLoading } = useTrendingMovieList()
  const { data: actionMovies = [], isLoading: actionLoading } =
    useGenreMovieList("action")
  const { data: adventureMovies = [], isLoading: adventureLoading } =
    useGenreMovieList("adventure")
  const { data: animationMovies = [], isLoading: animationLoading } =
    useGenreMovieList("animation")
  const { data: comedyMovies = [], isLoading: comedyLoading } =
    useGenreMovieList("comedy")
  const { data: crimeMovies = [], isLoading: crimeLoading } =
    useGenreMovieList("crime")
  const { data: documentaryMovies = [], isLoading: documentaryLoading } =
    useGenreMovieList("documentary")
  const { data: dramaMovies = [], isLoading: dramaLoading } =
    useGenreMovieList("drama")
  const { data: familyMovies = [], isLoading: familyLoading } =
    useGenreMovieList("family")
  const { data: fantasyMovies = [], isLoading: fantasyLoading } =
    useGenreMovieList("fantasy")
  const { data: historyMovies = [], isLoading: historyLoading } =
    useGenreMovieList("history")
  const { data: horrorMovies = [], isLoading: horrorLoading } =
    useGenreMovieList("horror")
  const { data: musicMovies = [], isLoading: musicLoading } =
    useGenreMovieList("music")
  const { data: mysteryMovies = [], isLoading: mysteryLoading } =
    useGenreMovieList("mystery")
  const { data: romanceMovies = [], isLoading: romanceLoading } =
    useGenreMovieList("romance")
  const { data: scifiMovies = [], isLoading: scifiLoading } =
    useGenreMovieList("sci-fi")
  const { data: thrillerMovies = [], isLoading: thrillerLoading } =
    useGenreMovieList("thriller")
  const { data: warMovies = [], isLoading: warLoading } =
    useGenreMovieList("war")
  const { data: westernMovies = [], isLoading: westernLoading } =
    useGenreMovieList("western")
  const { isOpen, closeModal } = useInfoModal()
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })
  if (
    isLoading
    // actionLoading ||
    // animationLoading ||
    // comedyLoading ||
    // crimeLoading ||
    // documentaryLoading ||
    // dramaLoading ||
    // familyLoading ||
    // fantasyLoading ||
    // historyLoading ||
    // horrorLoading ||
    // musicLoading ||
    // mysteryLoading ||
    // romanceLoading ||
    // scifiLoading ||
    // thrillerLoading ||
    // warLoading ||
    // westernLoading
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
  }
  return (
    <div>
      <Navbar />
      <div className="pt-5">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
        <MovieList title="Trending Movies Today" data={trendingMovies} />
        <MovieList title="Popular Action Movies" data={actionMovies} />
        <MovieList title="Popular Adventure Movies" data={adventureMovies} />
        <MovieList title="Popular Animation Movies" data={animationMovies} />
        <MovieList title="Popular Comedy Movies" data={comedyMovies} />
        <MovieList title="Popular Crime Movies" data={crimeMovies} />
        <MovieList
          title="Popular Documentary Movies"
          data={documentaryMovies}
        />
        <MovieList title="Popular Drama Movies" data={dramaMovies} />
        <MovieList title="Popular Family Movies" data={familyMovies} />
        <MovieList title="Popular Fantasy Movies" data={fantasyMovies} />
        <MovieList title="Popular History Movies" data={historyMovies} />
        <MovieList title="Popular Horror Movies" data={horrorMovies} />
        <MovieList title="Popular Music Movies" data={musicMovies} />
        <MovieList title="Popular Mystery Movies" data={mysteryMovies} />
        <MovieList title="Popular Romance Movies" data={romanceMovies} />
        <MovieList title="Popular Sci-Fi Movies" data={scifiMovies} />
        <MovieList title="Popular Thriller Movies" data={thrillerMovies} />
        <MovieList title="Popular War Movies" data={warMovies} />
        <MovieList title="Popular Western Movies" data={westernMovies} />
      </div>
    </div>
  )
}

export default Movies
