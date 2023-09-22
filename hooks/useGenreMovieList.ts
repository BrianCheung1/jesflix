import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useGenreMovieList = (genre: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/movies/genre/${genre}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    data,
    error,
    isLoading,
  }
}

export default useGenreMovieList
