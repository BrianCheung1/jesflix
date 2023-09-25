import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useToken = (token: string) => {
  const { data, error, isLoading } = useSWR(`/api/reset/${token}`, fetcher, {
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

export default useToken
