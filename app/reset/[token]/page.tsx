"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import { redirect, useParams, useRouter } from "next/navigation"

const Reset = () => {
  const { token } = useParams()
  const [resetPassword, setResetPassword] = useState("")
  const router = useRouter()
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

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
