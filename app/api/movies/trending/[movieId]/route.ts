import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import axios from "axios"

// export async function GET(
//   req: Request,
//   { params }: { params: { movieId: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (session) {
//     const id = params.movieId;
//     if (typeof id !== 'string') {

//       throw new Error('Invalid ID');
//     }
//     if (!id) {
//       throw new Error('Invalid ID');
//     }
//     try {
//       const movie = await prismadb.movie.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       if (!movie) {
//         throw new Error('Invalid ID');
//       }
//       return NextResponse.json(movie);
//     } catch (error) {
//       return NextResponse.json(error);
//     }
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  const session = await getServerSession(authOptions)
  if (session) {
    const id = params.movieId
    if (typeof id !== "string") {
      throw new Error("Invalid ID")
    }
    if (!id) {
      throw new Error("Invalid ID")
    }
    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
      const movie = await axios.request(options)
      return NextResponse.json(movie.data)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
