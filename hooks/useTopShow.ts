import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useTopShow = () => {
  const { data, error, isLoading } = useSWR("/api/shows/top", fetcher, {
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

export default useTopShow
