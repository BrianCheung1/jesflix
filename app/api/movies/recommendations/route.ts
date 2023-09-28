import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import axios from "axios";
import prismadb from "@/libs/prismadb"

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

    const id = list?.movies[random]?.id
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    };

    const movies = await axios.request(options);
    return NextResponse.json(movies.data.results);
  }
}
