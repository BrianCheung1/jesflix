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
      console.log(query)

      let list = { movies: [] as any[], shows: [] as any[] }
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
      list["movies"] = movies.data.results
      const optionsShow = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
      const shows = await axios.request(optionsShow)

      list["shows"] = shows.data.results

      return NextResponse.json(list)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
