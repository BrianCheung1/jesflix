import axios from "axios"
import React, { useCallback, useMemo } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import { AiFillHeart } from "react-icons/ai"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { GoShare } from "react-icons/go"

interface FavoriteButtonProps {
  movieId: string
  type: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, type }) => {
  const { data: session } = useSession()
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()
  const [isVisible, setIsVisible] = useState(false)
  const [variant, setVariant] = useState("Add")
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
      setVariant("delete")
    } else {
      response = await axios.post("/api/favorite", { movieId, type })
      setVariant("add")
    }
    const updatedFavoriteMovieIds = response?.data?.favoriteMovieIds
    const updatedFavoriteShowIds = response?.data?.favoriteShowIds
    mutate({
      ...currentUser,
      favoriteMovieIds: updatedFavoriteMovieIds,
      favoriteShowIds: updatedFavoriteShowIds,
    })
    mutateFavorites()
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites, type])

  return (
    <div>
      <button
        onClick={session ? toggleFavorites : login}
        className="cursor-pointer py-1
        md:py-2"
      >
        <AiFillHeart
          className={`${
            isFavorite ? "text-red-800" : "text-white"
          } hover:scale-125 duration-300 `}
          size={25}
        />
      </button>
      <div
        className={
          isVisible
            ? `absolute rounded-md bg-blue-500 text-white text-sm font-bold px-2 py-2 z-50 text-center `
            : `hidden`
        }
        role="alert"
      >
        <p>{variant === "add" ? "Added" : "Deleted"}</p>
      </div>
    </div>
  )
}

export default FavoriteButton
