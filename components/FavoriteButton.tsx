import axios from "axios"
import React, { useCallback, useMemo } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface FavoriteButtonProps {
  movieId: string
  type: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, type }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()
  const notify = (value: string) => toast(value)

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
      notify("Removed from favorites")
    } else {
      notify("Added to favorites")
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
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        onClick={toggleFavorites}
        className="cursor-pointer group/item w-6 h-6 border-white border-2 rounded-full flex justify-center items-center transition hover:border-netural-300"
      >
        <Icon className="text-white" size={25} />
      </div>
    </div>
  )
}

export default FavoriteButton
