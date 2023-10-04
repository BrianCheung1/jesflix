import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import axios from "axios"


//takes a list of popular movies
//chooses a random movie from that list
//videos is appended in addition to the details of the movie chosen
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?&append_to_response=videos",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }

    const movies = await axios.request(options)
    const randomInd = Math.floor(Math.random() * 12)

    const options2 = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movies.data.results[randomInd]["id"]}?&append_to_response=videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
    const movies2 = await axios.request(options2)
    return NextResponse.json(movies2.data)
  } catch (error) {
    return NextResponse.json(error)
  }
  
}
