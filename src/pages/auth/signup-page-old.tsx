import { Logo } from "@/shared/icons"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

function SignupPageOld() {
  const [email, setEmail] = useState("")

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100">
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 h-96 w-96 animate-blob rounded-full bg-blue-400 opacity-30 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 absolute top-0 right-0 h-96 w-96 animate-blob rounded-full bg-purple-400 opacity-30 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-4000 absolute bottom-0 left-1/4 h-96 w-96 animate-blob rounded-full bg-pink-400 opacity-30 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-6000 absolute right-1/4 bottom-0 h-96 w-96 animate-blob rounded-full bg-yellow-300 opacity-30 mix-blend-multiply blur-3xl filter" />
      </div>

      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-black p-3">
              <Logo className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="mb-2 text-center font-bold text-2xl text-gray-800">Start your 14-day free trial</h2>
          <p className="mb-8 text-center text-gray-600">Explore our #AI-first customer support platform</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block font-medium text-gray-700 text-sm">
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800">
              <span className="font-medium">Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-gray-600 text-sm hover:text-gray-800">
              Already have an account?
            </Link>
          </div>
        </div>

        {/* <div className="bg-amber-50 p-6">
                    <p className="mb-4 text-center text-sm text-gray-600">
                        More than{' '}
                        <span className="font-semibold text-gray-800">
                            4,100+ industry-leading companies
                        </span>{' '}
                        rely on Gleap.
                    </p>
                    <div className="flex items-center justify-center space-x-8 opacity-70">
                        <div
                            className="h-6 w-20 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg')",
                            }}
                        ></div>
                        <div
                            className="h-6 w-20 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://upload.wikimedia.org/wikipedia/commons/4/46/UNICEF_Logo.svg')",
                            }}
                        ></div>
                        <div
                            className="h-6 w-20 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Squarespace_Logo.svg')",
                            }}
                        ></div>
                    </div>
                </div> */}
      </div>
    </div>
  )
}

export default SignupPageOld
