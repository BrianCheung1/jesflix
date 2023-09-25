import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"
import { randomUUID } from "crypto"
import nodemailer from "nodemailer"

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

    let d = new Date()
    d.setDate(d.getDate() + 1)
    const token = await prismadb.activationToken.create({
      data: {
        userId: user.id,
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
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: "Verification for Buttflix",
      text: `https://netflix-clone-tau-murex.vercel.app/api/activate/${token.token}`,
      html: "<html><body>Hello World....</body></html>",
    }

    try {
      let info = await transporter.sendMail({
        from: '"Buttflix" ' + process.env.EMAIL_SERVER_USER,
        to: email,
        subject: "Buttflix Confirmation",
        html: `Your account has been activated, Enjoy watching on buttflix!`,
        //text: `https://netflix-clone-tau-murex.vercel.app/api/activate/${token.token}`,
        //html: `<p>Activate your account with this link: <a href=https://netflix-clone-tau-murex.vercel.app/api/activate/${token.token}> Click Here </a> </p>`,
      })
      console.log(info)
    } catch (err) {
      console.log("Email (Sign Up) Error", err)
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error)
  }
}
