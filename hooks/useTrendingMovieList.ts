import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useTrendingMovieList = () => {
  const { data, error, isLoading } = useSWR("/api/movies/trending", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}

export default useTrendingMovieList
