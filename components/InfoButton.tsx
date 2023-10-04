import React, { useState, useCallback } from "react"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AiOutlineInfoCircle } from "react-icons/ai"

interface InfoButtonProps {
  movieId: string
  type: string
}

const InfoButton: React.FC<InfoButtonProps> = ({ movieId, type }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  const moreInfo = () => {
    if (type === "movie") {
      router.push(`/movies/${movieId}`)
    } else {
      router.push(`/shows/${movieId}`)
    }
  }

  return (
    <div className="">
      <button
        onClick={moreInfo}
        className="cursor-pointer py-1
        md:py-2"
      >
        <AiOutlineInfoCircle
          size={25}
          className="hover:scale-125 text-white hover:text-blue-800 duration-300"
        />
      </button>
    </div>
  )
}

export default InfoButton
