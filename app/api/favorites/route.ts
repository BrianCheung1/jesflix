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
      // const favoriteMovies = await prismadb.movie.findMany({
      //     where: {
      //         id: {
      //             in: user?.favoriteIds
      //         }
      //     }
      // })
      if (!user) {
        return null
      }

      let movies = []
      for(let i = 0; i < user["favoriteIds"].length;i++){
        const id = user["favoriteIds"][i]
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${id}`,
            params: {language: 'en-US'},
            headers: {
              accept: "application/json",
              Authorization:
              `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
            },
          }
        const movie = await axios.request(options)
        
        movies.push(movie.data)
      }
      return NextResponse.json(movies)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
