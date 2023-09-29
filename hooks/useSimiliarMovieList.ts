import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useSimiliarMovieList = () => {
  const { data, error, isLoading } = useSWR(
    `/api/movies/similar`,
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

export default useSimiliarMovieList
