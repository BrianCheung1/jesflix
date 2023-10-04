import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prismadb from "@/libs/prismadb"
import nodemailer from "nodemailer"


//saves users credentials to database
//checks if email already exists if not successfully saves
//and sends a confirmation email
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
        subject: "Jesflix Confirmation",
        html: `Your account has been activated, Enjoy watching on Jesflix!`,
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
