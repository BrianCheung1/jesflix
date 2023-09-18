import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json()
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error)
  }
}
