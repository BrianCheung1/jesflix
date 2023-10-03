import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import axios from "axios"

//Returns the details of a specific tv show
//credits and videos are appended to the API
export async function GET(
  req: Request,
  { params }: { params: { showId: string } }
) {
  const session = await getServerSession(authOptions)

  const id = params.showId
  if (typeof id !== "string") {
    throw new Error("Invalid ID")
  }
  if (!id) {
    throw new Error("Invalid ID")
  }
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}?&append_to_response=credits%2C%20video`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
    const movie = await axios.request(options)
    return NextResponse.json(movie.data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
