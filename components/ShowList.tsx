import React from "react"
import { isEmpty } from "lodash"
import ShowCard from "./ShowCard"
import { BsFillPlayFill } from "react-icons/bs"
import { BiChevronDown } from "react-icons/bi"

interface ShowListProps {
  data: Record<string, any>[]
  title: string
  isLoading: boolean
}

const ShowList: React.FC<ShowListProps> = ({ data, title, isLoading }) => {
  const emptyData = () => {
    let listItems = []
    for (let i = 0; i < 20; i++) {
      listItems.push(
        <div className="group bg-zinc-900 relative animate-pulse">
          <img
            className="cursor-pointer object-cover transition duraiton shadow-xl rounded-t-md w-full h-5/6"
            src={"https://critics.io/img/movies/poster-placeholder.png"}
            alt="Thumbnail"
          />
          <div className="bg-zinc-800 p-2 lg:p-3 w-full shadow-md rounded-b-md ">
            <div className="flex flex-row items-center">
              <div className="cursor-pointer text-white transition hover:scale-125 hover:text-blue-800">
                <BsFillPlayFill size={30} />
              </div>
              <div
                onClick={() => {}}
                className="cursor-pointer ml-auto group/item w-6 h-6 flex justify-center items-center transition hover:scale-125"
              >
                <BiChevronDown
                  size={30}
                  className="text-white hover:text-blue-800"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return listItems
  }
  if (isLoading) {
    return (
      <div className="px-4 md:px-12 space-y-8">
        <div>
          <p className="text-white text-2xl md:text-3xl font-bold mb-4 pt-10">
            Loading...
          </p>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-2 grid-cols-2">
            {emptyData()}
          </div>
        </div>
      </div>
    )
  }
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
          {data.map((show) => (
            <ShowCard key={show.id} data={show} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowList
