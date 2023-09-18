import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    try {
      const movies = await prismadb.movie.findMany()
      return NextResponse.json(movies)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
