import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useMovie = (id?: string) => {
    const {data, error, isLoading} = useSWR(id ? `/api/movies/trending/${id}`: null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus:false,
        revalidateOnReconnect: false
    })
    return{data, error, isLoading}
}

export default useMovie