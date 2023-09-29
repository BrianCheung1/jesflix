"use client"

import useCurrentUser from "@/hooks/useCurrentUser"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const Profile = () => {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth")
    },
  })

  const { data: user } = useCurrentUser()
  const notify = () => toast.success("Reset Password Email Sent")

  const changePassword = async () => {
    const resetEmail = user.email
    try {
      const res = await axios.post("/api/reset", {
        redirect: false,
        resetEmail
      })
      toast.dismiss();
      notify()
    } catch {
      console.log("Error")
    }
  }

  if (!user) {
    return (
      <div className="animate-pulse text-white w-full h-full flex justify-center items-center">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-red-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <Toaster
        position="top-right"
        containerStyle={{
          top: 80,
        }}
      />
      <div className="flex flex-col flex-wrap items-center h-full w-full pt-32 gap-4">
        <div className="pb-5 w-3/4 items-center justify-center flex">
          <img
            className="rounded-3xl"
            src="/images/default-blue.png"
            alt="Sunset in the mountains"
          />
        </div>
        <div className="w-1/2 rounded-md overflow-hidden shadow-lg bg-slate-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl">
              {`${user.name}'s`} Account Info
            </div>
            <p className="text-black">{user.email}</p>
            <p className="text-gray-700 text-base">
              Password: ***********
              <button
                onClick={changePassword}
                className="bg-white
              rounded-md
              py-1
              px-2
              w-auto
              text-xs
              font-semibold
              transition
              hover:text-blue-800 mx-2"
              >
                Change
              </button>
            </p>
            <p className="text-black text-base">
              Member since
              {` ${new Date(Date.parse(user.createdAt)).toLocaleString(
                "default",
                { month: "long", year: "numeric" }
              )}`}
            </p>
          </div>
        </div>
        <div className="w-1/2 rounded-md overflow-hidden shadow-lg bg-slate-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Favorites</div>
            <p className="text-black">
              Total Movies Added: {user.favoriteMovieIds.length}
            </p>
            <p className="text-black text-base">
              Total Shows Added: {user.favoriteShowIds.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
