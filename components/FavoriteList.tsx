import React from "react"
import { isEmpty } from "lodash"
import ShowCard from "./ShowCard"
import MovieCard from "./MovieCard"
import MovieList from "./MovieList"
import ShowList from "./ShowList"

interface FavoriteListProps {
  data: { movies: any; shows: any }
  title: string
}

const FavoriteList: React.FC<FavoriteListProps> = ({ data, title }) => {
  let movieLength = 0
  let showLength = 0

  if (data.movies) {
    movieLength = data.movies.length
  }
  if (data.shows) {
    showLength = data.shows.length
  }

  let length = movieLength > showLength ? movieLength : showLength

  const renderFavorites = () => {
    const listItems = []
    for (let i = 0; i < length; i++) {
      if (data.movies[i]) {
        console.log(data.movies[i].title)
        listItems.push(
          <MovieCard key={data.movies[i].id} data={data.movies[i]} />
        )
      }
      if (data.shows[i]) {
        console.log(data.shows[i].name)
        listItems.push(<ShowCard key={data.shows[i].id} data={data.shows[i]} />)
      }
    }
    console.log(listItems)
    return listItems
  }
  if (isEmpty(data.movies) && isEmpty(data.shows)) {
    return null
  }

  return (
    <div className="">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold px-4 md:px-12 pt-10">
          {title}
        </p>
      <MovieList title="Movies" data={data.movies.toReversed()} />
      <ShowList title="Shows" data={data.shows.toReversed()} />
    </div>
    // <div className="px-4 md:px-12 mt-4 pt-10 space-y-8">
    //   <div>
    //     <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
    //       {title}
    //     </p>
    //     <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-2 grid-cols-2">
    //       {data["movies"].toReversed().map((movie: any) => (
    //         <MovieCard key={movie.id} data={movie} />
    //       ))}

    //       {data["shows"].toReversed().map((show: any) => (
    //         <ShowCard key={show.id} data={show} />
    //       ))}
    //       {/* {renderFavorites()} */}
    //     </div>
    //   </div>
    // </div>
  )
}

export default FavoriteList
