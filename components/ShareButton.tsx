import React, { useState, useCallback } from "react"

import { BsFillPlayFill } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { GoShare } from "react-icons/go"

interface ShareButtonProps {
  movieId: string
  type: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ movieId, type }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  const copyToClipboard = useCallback(() => {
    if (type === "movie") {
      navigator.clipboard.writeText(
        `https://jesflix.vercel.app/movies/${movieId}`
      )
    } else {
      navigator.clipboard.writeText(
        `https://jesflix.vercel.app/shows/${movieId}`
      )
    }
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }, [movieId, type])

  return (
    <div className="">
      <button
        disabled={isVisible ? true : false}
        onClick={copyToClipboard}
        className="
      cursor-pointer transition
      "
      >
        <GoShare
          size={25}
          className="hover:scale-125 text-white hover:text-blue-800"
        />
      </button>

      <div
        className={
          isVisible
            ? `absolute rounded-md flex items-center bg-blue-500 text-white text-sm font-bold px-2 py-2 z-50 text-center`
            : `hidden`
        }
        role="alert"
      >
        <p>Copied</p>
      </div>
    </div>
  )
}

export default ShareButton
