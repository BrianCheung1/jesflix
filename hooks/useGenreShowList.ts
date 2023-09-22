import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useGenreShowList = (genre: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/shows/genre/${genre}`,
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

export default useGenreShowList
