import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { without } from "lodash"
import prismadb from "@/libs/prismadb"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const { movieId } = await req.json()
      // const existingMovie = await prismadb.movie.findUnique({
      //   where: {
      //     id: movieId,
      //   },
      // });
      // if (!existingMovie) {
      //   throw new Error('Invalid ID');
      // }

      const user = await prismadb.user.update({
        where: {
          email: session?.user?.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      })
      return NextResponse.json(user)
    } catch (error) {
      console.log(error)
      return NextResponse.json(error, { status: 400 })
    }
  } else {
    return NextResponse.redirect("/api/auth/signin")
  }
}
export async function DELETE(req: Request, res: Response) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const { searchParams } = new URL(req.url)
      //   const movieId = searchParams.get('movieId');
      const { movieId } = await req.json()
      // const existingMovie = await prismadb.movie.findUnique({
      //   where: {
      //     id: movieId || '',
      //   },
      // });
      // if (!existingMovie) {
      //   throw new Error('Invalid ID');
      // }
      const user = await prismadb.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
      })
      const updatedFavoriteIds = without(user?.favoriteIds, movieId)
      const updatedUser = await prismadb.user.update({
        where: {
          email: session?.user?.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      })
      return NextResponse.json(updatedUser)
    } catch (error) {
      return NextResponse.json(error, { status: 400 })
    }
  }
}
