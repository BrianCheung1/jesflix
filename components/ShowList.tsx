import React from "react"
import { isEmpty } from "lodash"
import ShowCard from "./ShowCard"

interface ShowListProps {
  data: Record<string, any>[]
  title: string
}

const ShowList: React.FC<ShowListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null
  }
  return (
    <div className="px-4 md:px-12 mt-4 pt-10 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-2 grid-cols-2">
          {data.map((show) => (
            <ShowCard key={show.id} data={show} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowList
