import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useSearchList = (query?: string) => {
  const { data, error, isLoading } = useSWR(
    query ? `/api/search/${query}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, error, isLoading }
}

export default useSearchList
