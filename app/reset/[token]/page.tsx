"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import { redirect, useParams, useRouter } from "next/navigation"
import useToken from "@/hooks/useToken"
import Navbar from "@/components/Navbar"

const Reset = () => {
  const { token } = useParams()
  const [resetPassword, setResetPassword] = useState("")
  const router = useRouter()
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const { data, isLoading } = useToken(token as string)

  const reset = useCallback(
    async (e: any) => {
      e.preventDefault()
      if (!validatePassword(resetPassword)) {
        return
      }
      try {
        const res = await axios.post(`/api/reset/${token}`, {
          redirect: false,
          resetPassword,
          token,
        })
        router.push("/auth")
      } catch (error) {
        console.log("Error in reset page token")
      }
    },
    [resetPassword, token, router]
  )

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const success = re.test(password)
    if (success) {
      setPasswordErrorMessage("")
    } else {
      setPasswordErrorMessage(
        "Password must be at least 8 characters, no spaces and must contain an uppercase letter, a number and a special character"
      )
    }

    return success
  }

  if (isLoading) {
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
  if (data?.activatedAt !== null) {
    return (
      <div>
        <div className="flex h-screen items-center justify-center text-white">
          <p>Link invalid/expired</p>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-black w-full h-full justify-center items-center flex">
      <form
        className="text-white flex flex-col items-center text-center"
        onSubmit={reset}
      >
        <label>
          Enter your new password
          <input
            className="block
            
            rounded-md
            px-6
            py-3
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus:ring-0
            peer"
            type="text"
            value={resetPassword}
            onChange={(e) => {
              setResetPassword(e.target.value), validatePassword(e.target.value)
            }}
          />
        </label>
        {passwordErrorMessage === "" || resetPassword.length === 0 ? null : (
          <p className="text-xs text-red-500 font-bold">
            {passwordErrorMessage}
          </p>
        )}
        <button
          onClick={reset}
          className="bg-red-600 py-3 text-white rounded-md w-32 mt-5 hover:bg-red-700 transition"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default Reset
