import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"
import axios from "axios"
import { redirect } from "next/navigation"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/trending/movie/day",
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
