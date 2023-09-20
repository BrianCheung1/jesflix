import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useShowList = () => {
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

export default useShowList
