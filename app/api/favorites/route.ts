import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"
import axios, { AxiosResponse } from "axios"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const user = await prismadb.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
      })
      if (!user) {
        return null
      }
 
      let list = {movies: [] as any[], shows: [] as any[]}
      for (let i = 0; i < user["favoriteMovieIds"].length; i++) {
        const id = user["favoriteMovieIds"][i]
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${id}`,
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
          },
        }
        const movie = await axios.request(options)

        list["movies"].push(movie.data)
      }
      for (let i = 0; i < user["favoriteShowIds"].length; i++) {
        const id = user["favoriteShowIds"][i]
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${id}`,
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
          },
        }
        const show = await axios.request(options)
        
        list["shows"].push(show.data)
      }
      return NextResponse.json(list)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
