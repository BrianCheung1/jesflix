import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { without } from "lodash"
import prismadb from "@/libs/prismadb"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const { movieId, type } = await req.json()
      console.log(movieId, type)

      if (type === "movie") {
        const user = await prismadb.user.update({
          where: {
            email: session?.user?.email || "",
          },
          data: {
            favoriteMovieIds: {
              push: movieId,
            },
          },
        })
        return NextResponse.json(user)
      } else if (type === "show") {
        const user = await prismadb.user.update({
          where: {
            email: session?.user?.email || "",
          },
          data: {
            favoriteShowIds: {
              push: movieId,
            },
          },
        })
        return NextResponse.json(user)
      }
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
      const { movieId, type } = await req.json()
      console.log(movieId, type)
      const user = await prismadb.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
      })

      const updatedFavoriteMovieIds = without(user?.favoriteMovieIds, movieId)
      const updatedFavoriteShowIds = without(user?.favoriteShowIds, movieId)
      if (type == "movie") {
        const updatedUser = await prismadb.user.update({
          where: {
            email: session?.user?.email || "",
          },
          data: {
            favoriteMovieIds: updatedFavoriteMovieIds,
          },
        })
        return NextResponse.json(updatedUser)
      } else if (type == "show") {
        const updatedUser = await prismadb.user.update({
          where: {
            email: session?.user?.email || "",
          },
          data: {
            favoriteShowIds: updatedFavoriteShowIds,
          },
        })
        return NextResponse.json(updatedUser)
      }
    } catch (error) {
      return NextResponse.json(error, { status: 400 })
    }
  }
}
