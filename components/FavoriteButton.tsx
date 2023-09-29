import axios from "axios"
import React, { useCallback, useMemo } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import { AiOutlinePlus, AiOutlineCheck, AiFillHeart } from "react-icons/ai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface FavoriteButtonProps {
  movieId: string
  type: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, type }) => {
  const { data: session } = useSession()
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()
  const router = useRouter()


  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteMovieIds || []
    const listShows = currentUser?.favoriteShowIds || []
    return list.includes(movieId) || listShows.includes(movieId)
  }, [currentUser, movieId])

  const login = () => {
    router.push("/auth")
  }

  const toggleFavorites = useCallback(async () => {
    let response
    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId, type },
      })
    } else {
      response = await axios.post("/api/favorite", { movieId, type })
    }
    const updatedFavoriteMovieIds = response?.data?.favoriteMovieIds
    const updatedFavoriteShowIds = response?.data?.favoriteShowIds
    mutate({
      ...currentUser,
      favoriteMovieIds: updatedFavoriteMovieIds,
      favoriteShowIds: updatedFavoriteShowIds,
    })
    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites, type])

  return (
    <div
      onClick={session ? toggleFavorites : login}
      className={`cursor-pointer group/item w-6 h-6 flex justify-center items-center transition hover:scale-125`}
    >
      <AiFillHeart
        className={isFavorite ? `text-red-800` : `text-white`}
        size={25}
      />
    </div>
  )
}

export default FavoriteButton
