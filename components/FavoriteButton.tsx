import axios from "axios"
import React, { useCallback, useMemo } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"

interface FavoriteButtonProps {
  movieId: string
  type: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, type }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteMovieIds || []
    const listShows = currentUser?.favoriteShowIds || []
    return list.includes(movieId) || listShows.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    let response
    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId, type },
      })
    } else {
      response = await axios.post("/api/favorite", { movieId, type })
    }
    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })
    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites, type])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 border-white border-2 rounded-full flex justify-center items-center transition hover:border-netural-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  )
}

export default FavoriteButton
