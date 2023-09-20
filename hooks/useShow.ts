import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useShow = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/shows/trending/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, error, isLoading }
}

export default useShow
