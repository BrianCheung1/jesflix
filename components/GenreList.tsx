import React from "react"

interface GenreListProps {
  data: Record<string, any>
}

const GenreList: React.FC<GenreListProps> = ({ data }) => {
  const renderGenres = () => {
    const genres = data?.genres
      ?.map((genre: any) => {
        return genre.name
      })
      .join(", ")
    return genres
  }

  return <div>{renderGenres()}</div>
}

export default GenreList
