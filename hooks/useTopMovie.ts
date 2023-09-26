import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useTopMovie = () => {
  const { data, error, isLoading } = useSWR("/api/movies/top", fetcher, {
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

export default useTopMovie
