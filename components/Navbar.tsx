import NavbarItem from "./NavbarItem"
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"
import MobileMenu from "./MobileMenu"
import { useCallback, useState, useEffect } from "react"
import AccountMenu from "./AccountMenu"
import { useRouter } from "next/navigation"

const TOP_OFFSET = 66
const Navbar = () => {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [query, setQuery] = useState("")

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
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])

  const handleSearch = (event: any) => {
    event.preventDefault()
    if (query.length === 0) return
    router.push(`/search/${query}`)
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
        <div className="flex flex-row items-center gap-4 ml-auto">
          <div className="px-3">
            <form onSubmit={handleSearch}>
              <input
                className="w-full rounded-md bg-neutral-700 text-white outline-none px-2 text-sm h-6 lg:h-8"
                type="text"
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
