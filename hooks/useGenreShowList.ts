import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useGenreShowList = (genre: string, page:string) => {
  const { data, error, isLoading } = useSWR(
    `/api/shows/genre/${genre}/${page}`,
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
