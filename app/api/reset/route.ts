import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"
import { randomUUID } from "crypto"
import nodemailer from "nodemailer"

export const POST = async (req: Request) => {
  try {
    const { resetEmail: email } = await req.json()
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })
    if (!existingUser) {
      return new NextResponse("Email does not exist")
    }

    const token = await prismadb.activationToken.create({
      data: {
        userId: existingUser.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    })

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
    try {
      let info = await transporter.sendMail({
        from: '"Jesflix" ' + process.env.EMAIL_SERVER_USER,
        to: email,
        subject: "Jesflix Reset Password",
        html: `<p>Reset your account here: <a href=https://jesflix.vercel.app/reset/${token.token}>Click Here</a><p>`,
        //text: `https://netflix-clone-tau-murex.vercel.app/api/activate/${token.token}`,
        //html: `<p>Activate your account with this link: <a href=https://netflix-clone-tau-murex.vercel.app/api/activate/${token.token}> Click Here </a> </p>`,
      })
      console.log(info)
    } catch (err) {
      console.log("Email (Sign Up) Error", err)
    }
    return NextResponse.json(existingUser)
  } catch (error) {
    return NextResponse.json(error)
  }
}
