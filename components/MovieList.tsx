import React from "react"
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"

interface MovieListProps {
  data: Record<string, any>[]
  title: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null
  }
  return (
    <div className="px-4 md:px-12 space-y-8">
      <div>
        <p className="text-white text-2xl md:text-3xl font-bold mb-4 pt-10">
          {title}
        </p>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-2 grid-cols-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
