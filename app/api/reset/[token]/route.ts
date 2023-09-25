import prismadb from "@/libs/prismadb"
import { redirect, useParams } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export const POST = async (req: Request) => {
  const { resetPassword: password, token } = await req.json()
  const user = await prismadb.user.findFirst({
    where: {
      activationTokens: {
        some: {
          AND: [
            {
              activatedAt: undefined,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  })
  
  const activatedToken = await prismadb.activationToken.findUnique({
    where: {
      token,
    },
  })

  if (!user) {
    throw new Error("Token is invalid or expired")
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  await prismadb.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
      hashedPassword: hashedPassword,
    },
  })

  await prismadb.activationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  })
  return NextResponse.json(activatedToken)
}


export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token

  const activatedToken = await prismadb.activationToken.findUnique({
    where: {
      token,
    },
  })

  return NextResponse.json(activatedToken)
}