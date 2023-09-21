import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import axios from "axios"

export async function GET(
  req: Request,
  { params }: { params: { showId: string } }
) {
  const session = await getServerSession(authOptions)
  if (session) {
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
        url: `https://api.themoviedb.org/3/tv/${id}?&append_to_response=videos`,
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
}
