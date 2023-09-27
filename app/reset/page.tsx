"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai"

const Reset = () => {
  const [resetEmail, setResetEmail] = useState("")
  const router = useRouter()
  const [emailErrorMessage, setEmailErrorMessage] = useState("")

  const reset = useCallback(
    async (e: any) => {
      e.preventDefault()
      if (!validateEmail(resetEmail)) {
        return
      }
      try {
        const res = await axios.post("/api/reset", {
          redirect: false,
          resetEmail,
        })
        router.push("/auth")
      } catch (error) {
        console.log("Error in reset page")
      }
    },
    [resetEmail, router]
  )

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const success = re.test(email)
    if (success) {
      setEmailErrorMessage("")
    } else {
      setEmailErrorMessage("Invalid email")
    }
    return success
  }

  return (
    <div className="bg-black w-full h-full justify-center items-center flex flex-col">
      <div
        className="
         w-full p-4 z-10 
         items-center 
        gap-8 bg-black bg-opacity-70
      "
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={30}
        />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <form className="text-white items-center text-center" onSubmit={reset}>
          <label>
            Enter your email
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
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value), validateEmail(e.target.value)
              }}
            />
            {emailErrorMessage === "" || resetEmail.length === 0 ? null : (
              <p className="text-xs text-red-500 font-bold">
                {emailErrorMessage}
              </p>
            )}
          </label>
          <button
            onClick={reset}
            className="bg-red-600 py-3 text-white rounded-md w-1/2 mt-5 hover:bg-red-700 transition"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reset
