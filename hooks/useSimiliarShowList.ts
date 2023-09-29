import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useSimiliarShowList = () => {
  const { data, error, isLoading } = useSWR(
    `/api/shows/similar`,
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

export default useSimiliarShowList
