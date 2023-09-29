import axios from "axios"
import React, { useCallback, useMemo } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"

const Footer = () => {
  return (
    <footer className="bg-black rounded-lg shadow dark:bg-gray-900 mt-10">
      <div className="w-full mx-auto p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://jesflix.vercel.app/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src="/images/logo.png" alt="Logo=" className="h-8 mr-3" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              Disclaimer: This site does not store any files on its server. All
              contents are provided by non-affiliated third parties.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
