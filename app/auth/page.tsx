"use client"
import Input from "@/components/inputs"
import { useState, useCallback } from "react"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRouter, redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import validator from "validator"
import "react-toastify/dist/ReactToastify.css"

const Auth = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errorPasswordMessage, setPasswordErrorMessage] = useState("")
  const [errorEmailMessage, setEmailErrorMessage] = useState("")
  const [errorUsernameMessage, setUsernameErrorMessage] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validUsername, setValidUsername] = useState(false)

  const [variant, setVariant] = useState("login")
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  }, [])

  const validateUsername = (value: string) => {
    if (
      validator.isLength(value, {
        min: 1,
      })
    ) {
      setValidUsername(true)
      setUsernameErrorMessage("Valid Username")
    } else {
      setValidUsername(false)
      setUsernameErrorMessage("Username has less than 3 characters")
    }
  }

  const validateEmail = (value: string) => {
    if (validator.isEmail(value)) {
      setValidEmail(true)
      setEmailErrorMessage("Valid Email")
    } else {
      setValidEmail(false)
      setEmailErrorMessage("Invalid Email")
    }
  }

  const validatePassword = (value: string) => {
    if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setValidPassword(false)
      setPasswordErrorMessage("Password has less than 8 characters")
    } else if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setValidPassword(false)
      setPasswordErrorMessage("Password has no numbers")
    } else if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setValidPassword(false)
      setPasswordErrorMessage("Password has no capital letters")
    } else if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setValidPassword(false)
      setPasswordErrorMessage("Password has no symbols")
    } else {
      setValidPassword(true)
      setPasswordErrorMessage("Strong password")
    }
  }

  const notify = () => toast("Email already exists")
  const notifyEmail = () => toast("Please check your email to activate account")

  const login = useCallback(async () => {
    try {
      const success = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/profiles",
      })
      console.log(success)
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      const res = await axios.post("/api/register", {
        redirect: false,
        email,
        name,
        password,
      })
      // notifyEmail()
      // setVariant("login")
      // setEmail("")
      // setName("")
      // setPassword("")
      // setUsernameErrorMessage("")
      // setEmailErrorMessage("")
      // setPasswordErrorMessage("")
      login()
    } catch (error) {
      console.log(error)
      notify()
    }
  }, [email, name, password])
  if (session) {
    router.push("/")
  }
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          limit={3}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="md:px-12 md:py-5 lg:justify-normal flex justify-center py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-red-500 font-bold">
                Do not use your real netflix password
              </p>
              {variant === "register" && (
                <div>
                  <Input
                    label="Username"
                    id="name"
                    value={name}
                    onChange={(event: any) => {
                      validateUsername(event.target.value)
                      setName(event.target.value)
                    }}
                  />
                  {errorUsernameMessage === "" ? null : (
                    <p className="text-xs text-red-500 font-bold">
                      {errorUsernameMessage}
                    </p>
                  )}
                </div>
              )}

              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(event: any) => {
                  setEmail(event.target.value)
                  validateEmail(event.target.value)
                }}
              />
              {variant === "login" || errorEmailMessage === "" ? null : (
                <p className="text-xs text-red-500 font-bold">
                  {errorEmailMessage}
                </p>
              )}
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(event: any) => {
                  setPassword(event.target.value)
                  validatePassword(event.target.value)
                }}
              />
              {variant === "login" || errorPasswordMessage === "" ? null : (
                <p className="text-xs text-red-500 font-bold">
                  {errorPasswordMessage}
                </p>
              )}
            </div>
            {variant == "login" && (
              <button
                onClick={login}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                Login
              </button>
            )}

            {variant == "register" && (
              <button
                disabled={!validPassword || !validEmail || !validUsername}
                onClick={register}
                className={
                  validPassword
                    ? `bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition`
                    : `bg-gray-300 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition`
                }
              >
                Sign up
              </button>
            )}

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                            w-10
                            h-10
                            bg-white 
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
                            w-10
                            h-10
                            bg-white 
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account here" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
