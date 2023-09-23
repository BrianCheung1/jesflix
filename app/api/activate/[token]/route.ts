import prismadb from "@/libs/prismadb"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: { token: string }
  }
) {
  const { token } = params

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
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
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
  console.log(token)
  console.log(user)
  console.log(activatedToken)

  if (!user) {
    throw new Error("Token is invalid or expired")
  }

  await prismadb.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
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

  redirect("/auth")
}
