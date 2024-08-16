"use client"
import Input from "@/components/inputs"
import { useState, useCallback } from "react"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRouter, redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "@/components/Footer"

const Auth = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errorPasswordMessage, setPasswordErrorMessage] = useState("")
  const [errorEmailMessage, setEmailErrorMessage] = useState("")
  const [errorUsernameMessage, setUsernameErrorMessage] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorConfirmPasswordMessage, setConfirmPasswordErrorMessage] =
    useState("")

  const [variant, setVariant] = useState("login")
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  }, [])

  const validateUsername = (username: string) => {
    const success = username.length > 0
    if (success) {
      setUsernameErrorMessage("")
    } else {
      setUsernameErrorMessage("Username can't be empty")
    }
    return success
  }

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

    const success2 = password === confirmPassword
    if (success2) {
      setConfirmPasswordErrorMessage("")
    } else {
      setConfirmPasswordErrorMessage("Passwords must match")
    }
    return success && success2
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    const success = password === confirmPassword
    if (success) {
      setConfirmPasswordErrorMessage("")
    } else {
      setConfirmPasswordErrorMessage("Passwords must match")
    }
    return success
  }

  const notify = (value: string) => toast(value)
  const notifyEmail = (value: string) => toast(value)

  const login = useCallback(async () => {
    try {
      const success = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      })
      if (success?.error) notifyEmail(success.error)
      console.log(success)
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    if (
      !validateUsername(name) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateConfirmPassword(confirmPassword)
    ) {
      notify("Unable to sign up")
      return
    }
    try {
      const res = await axios.post("/api/register", {
        redirect: false,
        email,
        name,
        password,
      })
      login()
    } catch (error) {
      notify("Email Already Exists")
    }
  }, [email, name, password, login, confirmPassword])

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
          <div className="cursor-pointer">
            <img
              onClick={() => router.push("/")}
              src="/images/logo.png"
              alt="Logo"
              className="h-12"
            />
          </div>
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
                <Input
                  label="Username"
                  id="name"
                  value={name}
                  onChange={(event: any) => {
                    validateUsername(event.target.value)
                    setName(event.target.value)
                  }}
                />
              )}
              {variant === "login" ||
              errorUsernameMessage === "" ||
              name.length === 0 ? null : (
                <p className="text-xs text-red-500 font-bold">
                  {errorUsernameMessage}
                </p>
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
              {variant === "login" ||
              errorEmailMessage === "" ||
              email.length === 0 ? null : (
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
              {variant === "login" ||
              errorPasswordMessage === "" ||
              password.length === 0 ? null : (
                <p className="text-xs text-red-500 font-bold">
                  {errorPasswordMessage}
                </p>
              )}
              {variant === "register" && (
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event: any) => {
                    setConfirmPassword(event.target.value)
                    validateConfirmPassword(event.target.value)
                  }}
                />
              )}
              {variant === "login" ||
              errorConfirmPasswordMessage === "" ||
              confirmPassword.length === 0 ? null : (
                <p className="text-xs text-red-500 font-bold">
                  {errorConfirmPasswordMessage}
                </p>
              )}
            </div>
            <p className="text-xs mt-2 text-red-500 font-bold text-right">
              <a href="/reset">Forgot Password?</a>
            </p>
            {variant == "login" ? (
              <button
                onClick={login}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={register}
                className={`bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition`}
              >
                Sign up
              </button>
            )}

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
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
                onClick={() => signIn("github", { callbackUrl: "/" })}
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
                ? "First time using Jesflix?"
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
      <Footer />
    </div>
  )
}

export default Auth
