import NavbarItem from "./NavbarItem"
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"
import MobileMenu from "./MobileMenu"
import { useCallback, useState, useEffect } from "react"
import AccountMenu from "./AccountMenu"
import Input from "./inputs"
import { useRouter } from "next/navigation"

const TOP_OFFSET = 66
const Navbar = () => {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
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

  const toggleSearchBar = useCallback(() => {
    setShowSearchBar((current) => !current)
  }, [])

  const handleSearch = (event: any) => {
    event.preventDefault()
    console.log(query)
    router.push(`/search/${query}`)
  }

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={`
        px-4
        md:px-16
        py-5
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-black bg-opacity-70" : "bg-black"}`}
      >
        <div
          onClick={() => {
            router.push(`/`)
          }}
        >
          <img className="h-4 md:h-7" src="/images/logo.png" alt="Logo=" />
        </div>
        <div
          className="flex-row
        ml-8
        gap-7
        hidden
        lg:flex"
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Film" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            } `}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
            />
            <input type="submit" value="Submit" />
          </form>
          <div
            onClick={() => {
              router.push(`/search/${query}`)
            }}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsSearch />
          </div>

          {/* <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div> */}
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
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
