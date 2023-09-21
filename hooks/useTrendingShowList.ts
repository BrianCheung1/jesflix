import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useTrendingShowList = () => {
  const { data, error, isLoading } = useSWR("/api/shows/trending", fetcher, {
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

export default useTrendingShowList
