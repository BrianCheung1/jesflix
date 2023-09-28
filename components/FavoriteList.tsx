import React, { useState } from "react"
import { isEmpty } from "lodash"
import MovieList from "./MovieList"
import ShowList from "./ShowList"

interface FavoriteListProps {
  data: { movies: any; shows: any }
}

const FavoriteList: React.FC<FavoriteListProps> = ({ data }) => {
  const [filter, setFilter] = useState("")

  if (isEmpty(data.movies) && isEmpty(data.shows)) {
    return null
  }

  let filteredMovies = data.movies.filter((movie: any) => {
    return movie.title.toLowerCase().includes(filter.toLowerCase())
  })

  let filteredShows = data.shows.filter((show: any) => {
    return show.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="flex flex-col justify-center items-center mt-24 ">
      <form className="">
        <input
          className="text-white bg-neutral-700 rounded-full px-2 outline-0 py-2 w-full h-10 md:h-14 md:px-6"
          type="text"
          value={filter}
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      <MovieList title="Movies" data={filteredMovies.toReversed()} />
      <ShowList title="Shows" data={filteredShows.toReversed()} />
    </div>
  )
}

export default FavoriteList
