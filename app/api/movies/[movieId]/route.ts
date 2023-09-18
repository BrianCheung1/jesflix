import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"
import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

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
      const movie = await prismadb.movie.findUnique({
        where: {
          id: id,
        },
      })
      if (!movie) {
        throw new Error("Invalid ID")
      }
      return NextResponse.json(movie)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
