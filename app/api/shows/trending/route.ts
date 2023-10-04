import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import axios from "axios"

//returns trending shows based on the time frame of a day
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/tv/day",
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
