import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: Request,
  { params }: { params: { query: string } }
) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const query = params.query
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }

      const movies = await axios.request(options)
      return NextResponse.json(movies.data.results)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
