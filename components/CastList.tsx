import React from "react"

interface CastListProps {
  data: Record<string, any>
}

const CastList: React.FC<CastListProps> = ({ data }) => {
  const renderCast = () => {
    const listItems = []
    const cast = data?.credits?.cast
    for (let i = 0; i < data?.credits?.cast?.length; i++) {
      listItems.push(`${cast[i]?.name} as ${cast[i]?.character}`)
    }

    return listItems.join(", ")
  }

  return <div>{renderCast()}</div>
}

export default CastList
