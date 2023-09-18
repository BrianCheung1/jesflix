import { getServerSession } from "next-auth/next"

import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import prismadb from "@/libs/prismadb"

const serverAuth = async (req: Request) => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.redirect("Not signed In")
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  })

  if (!currentUser) {
    return new NextResponse("Not Signed In")
  }

  return NextResponse.json(currentUser)
}

export default serverAuth
