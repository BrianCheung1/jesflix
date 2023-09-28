import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useRecommendationMovieList = (id:string) => {
  const { data, error, isLoading } = useSWR(
    `/api/movies/recommendations/`,
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

export default useRecommendationMovieList
