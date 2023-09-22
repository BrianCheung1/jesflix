import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
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
