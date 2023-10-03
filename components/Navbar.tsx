import NavbarItem from "./NavbarItem"
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"
import { useCallback, useState, useEffect } from "react"
import AccountMenu from "./AccountMenu"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { BiLogIn } from "react-icons/bi"

const TOP_OFFSET = 66
const Navbar = () => {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [query, setQuery] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
    setShowAccountMenu(false)
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
    setShowMobileMenu(false)
  }, [])

  const handleSearch = (event: any) => {
    event.preventDefault()
    if(!session){
      router.push(`/auth`)
      return
    }
    if (query.length === 0) return
    router.push(`/search/${query}`)
  }

  if (!session) {
    return (
      <nav className="w-full fixed z-40 ">
        <div
          className={`
        px-4
        md:px-6
        py-3
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-black bg-opacity-70" : "bg-black"}`}
        >
          <img
            onClick={() => router.push(`/`)}
            className="h-10 cursor-pointer pt-2"
            src="/images/logo.png"
            alt="Logo="
          />

          <div  onClick={() => router.push(`/auth`)}>
            <NavbarItem visible={showMobileMenu} />
          </div>
          <div
            onClick={() => router.push(`/auth`)}
            className="flex-row flex
          lg:hidden
          whitespace-nowrap items-center gap-2 ml-8 cursor-pointer "
          >
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown
              className={`text-white transition ${
                showMobileMenu ? "rotate-180" : "rotate-0"
              } `}
            />
          </div>
          <div className="flex flex-row items-center gap-1 md:gap-4 lg:gap-6 ml-auto">
            <div className="px-3">
              <form onSubmit={handleSearch}>
                <input
                  className="text-xs text-white bg-neutral-700 rounded-full px-3 outline-0 py-2 w-full h-6 sm:h-8"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                  }}
                />
              </form>
            </div>
            <div
              onClick={() => router.push(`/auth`)}
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
            >
              <BsSearch />
            </div>
            <div
              onClick={() => router.push(`/auth`)}
              className="item-center transition hover:scale-125"
            >
              <BiLogIn className="text-white hover:text-blue-800" size={25} />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={`
        px-4
        md:px-6
        py-3
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-black bg-opacity-70" : "bg-black"}`}
      >
        <img
          onClick={() => router.push(`/`)}
          className="h-10 cursor-pointer pt-2"
          src="/images/logo.png"
          alt="Logo="
        />

        <NavbarItem visible={showMobileMenu} />

        <div
          onClick={toggleMobileMenu}
          className="flex-row flex
          lg:hidden
          whitespace-nowrap items-center gap-2 ml-8 cursor-pointer "
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            } `}
          />
        </div>
        <div className="flex flex-row items-center gap-1 md:gap-4 lg:gap-6 ml-auto">
          <div className="px-3">
            <form onSubmit={handleSearch}>
              <input
                className="text-xs text-white bg-neutral-700 rounded-full px-3 outline-0 py-2 w-full h-6 sm:h-8"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                }}
              />
            </form>
          </div>
          <div
            onClick={handleSearch}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsSearch />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
