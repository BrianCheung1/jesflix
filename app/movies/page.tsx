"use client";
import { useState } from "react";
import MovieList from "@/components/MovieList";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/InfoModal";
import ShowInfoModal from "@/components/ShowInfoModal";
import useInfoModal from "@/hooks/useMovieInfoModal";
import useShowInfoModal from "@/hooks/useShowInfoModal";
import useTrendingMovieList from "@/hooks/useTrendingMovieList";
import useGenreMovieList from "@/hooks/useGenreMovieList";
import Footer from "@/components/Footer";

const Movies = () => {
  const [actionPage, setActionPage] = useState(1);
  const [adventurePage, setAdventurePage] = useState(1);
  const [animationPage, setAnimationPage] = useState(1);
  const [comedyPage, setComedyPage] = useState(1);
  const [crimePage, setCrimePage] = useState(1);
  const [documentaryPage, setDocumentaryPage] = useState(1);
  const [dramaPage, setDramaPage] = useState(1);
  const [familyPage, setFamilyPage] = useState(1);
  const [fantasyPage, setFantasyPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const [horrorPage, setHorrorPage] = useState(1);
  const [musicPage, setMusicPage] = useState(1);
  const [mysteryPage, setMysteryPage] = useState(1);
  const [romancePage, setRomancePage] = useState(1);
  const [scifiPage, setScifiPage] = useState(1);
  const [thrillerPage, setThrillerPage] = useState(1);
  const [warPage, setWarPage] = useState(1);
  const [westernPage, setWesternPage] = useState(1);

  const { data: trendingMovies = [], isLoading } = useTrendingMovieList();
  const { data: actionMovies = [], isLoading: actionLoading } =
    useGenreMovieList("28", String(actionPage));
  const { data: adventureMovies = [], isLoading: adventureLoading } =
    useGenreMovieList("12", String(adventurePage));
  const { data: animationMovies = [], isLoading: animationLoading } =
    useGenreMovieList("16", String(animationPage));
  const { data: comedyMovies = [], isLoading: comedyLoading } =
    useGenreMovieList("35", String(comedyPage));
  const { data: crimeMovies = [], isLoading: crimeLoading } = useGenreMovieList(
    "80",
    String(crimePage)
  );
  const { data: documentaryMovies = [], isLoading: documentaryLoading } =
    useGenreMovieList("99", String(documentaryPage));
  const { data: dramaMovies = [], isLoading: dramaLoading } = useGenreMovieList(
    "18",
    String(dramaPage)
  );
  const { data: familyMovies = [], isLoading: familyLoading } =
    useGenreMovieList("10751", String(familyPage));
  const { data: fantasyMovies = [], isLoading: fantasyLoading } =
    useGenreMovieList("14", String(fantasyPage));
  const { data: historyMovies = [], isLoading: historyLoading } =
    useGenreMovieList("36", String(historyPage));
  const { data: horrorMovies = [], isLoading: horrorLoading } =
    useGenreMovieList("27", String(horrorPage));
  const { data: musicMovies = [], isLoading: musicLoading } = useGenreMovieList(
    "10402",
    String(musicPage)
  );
  const { data: mysteryMovies = [], isLoading: mysteryLoading } =
    useGenreMovieList("9648", String(mysteryPage));
  const { data: romanceMovies = [], isLoading: romanceLoading } =
    useGenreMovieList("10749", String(romancePage));
  const { data: scifiMovies = [], isLoading: scifiLoading } = useGenreMovieList(
    "878",
    String(scifiPage)
  );
  const { data: thrillerMovies = [], isLoading: thrillerLoading } =
    useGenreMovieList("53", String(thrillerPage));
  const { data: warMovies = [], isLoading: warLoading } = useGenreMovieList(
    "10752",
    String(warPage)
  );
  const { data: westernMovies = [], isLoading: westernLoading } =
    useGenreMovieList("37", String(westernPage));
  const { isOpen, closeModal } = useInfoModal();
  const { isOpen: isOpenShow, closeModal: closeModalShow } = useShowInfoModal();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

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
    );
  }
  return (
    <div>
      <Navbar />
      <div className="pt-10">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <ShowInfoModal visible={isOpenShow} onClose={closeModalShow} />
        <MovieList title="Trending Movies Today" data={trendingMovies} />
        <MovieList title="Popular Action Movies" data={actionMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setActionPage(actionPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Adventure Movies" data={adventureMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setAdventurePage(adventurePage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Animation Movies" data={animationMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setAnimationPage(animationPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Comedy Movies" data={comedyMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setComedyPage(comedyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Crime Movies" data={crimeMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setCrimePage(crimePage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList
          title="Popular Documentary Movies"
          data={documentaryMovies}
        />
                <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setDocumentaryPage(documentaryPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Drama Movies" data={dramaMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setDramaPage(dramaPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Family Movies" data={familyMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setFamilyPage(familyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Fantasy Movies" data={fantasyMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setFantasyPage(fantasyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular History Movies" data={historyMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setHistoryPage(historyPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Horror Movies" data={horrorMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setHorrorPage(horrorPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Music Movies" data={musicMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setMusicPage(musicPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Mystery Movies" data={mysteryMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setMysteryPage(mysteryPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Romance Movies" data={romanceMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setRomancePage(romancePage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Sci-Fi Movies" data={scifiMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setScifiPage(scifiPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Thriller Movies" data={thrillerMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setThrillerPage(thrillerPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular War Movies" data={warMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setWarPage(warPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
        <MovieList title="Popular Western Movies" data={westernMovies} />
        <div className="flex px-4 md:px-12 space-y-8 items-center justify-center">
          <button
            onClick={() => setWesternPage(westernPage + 1)}
            className="text-white"
          >
            See More
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Movies;
