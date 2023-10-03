import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import axios from "axios";
import prismadb from "@/libs/prismadb"


//returns shows based on similarity
//returns as a object of arrays 
//the similaritys are based on a list of genre of chosen tv show from user favorites
export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!user) {
      return null;
    }
    let list = { movies: [] as any[], shows: [] as any[] };
    for (let i = 0; i < user["favoriteMovieIds"].length; i++) {
      const id = user["favoriteMovieIds"][i];
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      };
      const movie = await axios.request(options);

      list["movies"].push(movie.data);
    }
    for (let i = 0; i < user["favoriteShowIds"].length; i++) {
      const id = user["favoriteShowIds"][i];
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      };
      const show = await axios.request(options);

      list["shows"].push(show.data);
    }
    const random = Math.floor(Math.random() * list?.movies?.length);
    const genre_ids = list?.shows[random]?.genres.map((genre:any) => genre.id)
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre_ids.join("%2C%20")}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    };

    let shows = await axios.request(options);
    return NextResponse.json({choice:  list?.shows[random], results: shows.data.results});
  }
}
