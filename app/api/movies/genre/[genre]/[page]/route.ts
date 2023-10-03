import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import axios from "axios"


//returns popular movies based on genre
//based on the paramaters given
//sorted by popularity in descending order
export async function GET(
  req: Request,
  { params }: { params: { page: string; genre: string } }
) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const page = params.page;
      const genre = params.genre;
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
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
