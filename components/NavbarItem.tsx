import React from "react"
import { useRouter } from "next/navigation"

interface NavbarItemProps {
  label?: string
  visible?: boolean
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, visible }) => {
  const router = useRouter()
  if (!visible) {
    return (
      <div
        className="flex-row
          ml-8
          gap-7
          hidden
          lg:flex
          whitespace-nowrap
          "
      >
        <div
          className="text-white cursor-pointer hover:text-gray-300 transition"
          onClick={() => router.push("/shows")}
        >
          TV Shows
        </div>
        <div
          className="text-white cursor-pointer hover:text-gray-300 transition "
          onClick={() => router.push("/movies")}
        >
          Movies
        </div>
        <div
          className="text-white cursor-pointer hover:text-gray-300 transition "
          onClick={() => router.push("/top")}
        >
          Top Rated
        </div>
        <div
          className="text-white cursor-pointer hover:text-gray-300 transition "
          onClick={() => router.push("/favorites")}
        >
          My List
        </div>
      </div>
    )
  }
  return (
    <div className="lg:hidden flex flex-row items-center cursor-pointer relative">
      <div className="bg-black w-56 absolute top-6 left-0 py-5 flex-col border-2 border-gray-800 flex">
        <div className="flex flex-col gap-4">
          <div
            className="px-3 text-center text-white hover:underline"
            onClick={() => router.push("/shows")}
          >
            TV Shows
          </div>
          <div
            className="px-3 text-center text-white hover:underline"
            onClick={() => router.push("/movies")}
          >
            Movies
          </div>
          <div
            className="px-3 text-center text-white hover:underline"
            onClick={() => router.push("/top")}
          >
            Top Rated
          </div>
          <div
            className="px-3 text-center text-white hover:underline"
            onClick={() => router.push("/favorites")}
          >
            My List
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarItem
