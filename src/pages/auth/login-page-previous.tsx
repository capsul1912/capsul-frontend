import { getAuthToken, setAuthTokens } from "@/api/cookies"
import technoCityImage from "@/assets/images/techno-city-image.png"
import { Logo } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { toast } from "@/shared/lib/hooks/use-toast"
import { type ISignInFormValues, signInSchema } from "@/shared/lib/validations/auth"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { Eye, EyeOff, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"

function LoginPage() {
  // Helpers
  const navigate = useNavigate()
  const location = useLocation()
  // States
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const from = location.state?.from?.pathname || "/main"
  useEffect(() => {
    const accessToken = getAuthToken()
    if (accessToken) {
      // Agar foydalanuvchi tizimga kirgan bo'lsa, oldingi sahifaga qaytarish
      navigate(from, { replace: true })
    }
  }, [navigate, from])
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  // Queries
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: data => {
      setAuthTokens(data.access, data.refresh)
      console.log("Sign in successful:", data)
      toast({
        title: "Welcome back",
        description: "You've successfully signed in."
      })

      navigate("/main")
    },
    onError: error => {
      console.error("Sign in error:", error)
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          toast({
            title: "Cors Error",
            variant: "destructive"
          })
          return
        }
      }
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: ISignInFormValues) => {
    // Extract rememberMe from form data
    const { rememberMe, ...credentials } = data
    console.log("Form submitted:", credentials, rememberMe)
    // Set remember me preference
    setRememberMe(rememberMe || false)

    // Call the mutation
    signIn(credentials)
  }

  return (
    <div
      className="flex min-h-screen bg-no-repeat"
      style={{
        backgroundImage: `url(${technoCityImage})`,
        backgroundSize: "100%",
        backgroundPosition: "100% 60%"
      }}
    >
      {/* Left side - Login Form */}
      <div className="flex-grow" />
      <div className="flex w-full flex-col items-center justify-between xl:w-[40%] xl:pt-10 xl:pb-3 2xl:pt-20 2xl:pb-5">
        <div className="h-auto min-h-[628px] min-w-[480px] max-w-md space-y-8 rounded-xl bg-white p-8 pt-[7%] shadow-auth-card">
          {/* Logo */}
          <Logo className="mx-auto h-[48px] w-[48px] text-white" />

          {/* Header */}
          <div className="text-center">
            <h2 className="font-semibold text-3xl text-gray-900 tracking-tight">Welcome to Capsul</h2>
            <p className="mt-2 text-dark-gray">Welcome back! Please enter your details.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[360px] space-y-6">
            <div>
              <Label htmlFor="email" className="block font-medium text-gray-700 text-sm">
                Email
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                <Mail className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-gray-700 text-sm">
                  Remember me
                </Label>
              </div>
              <Link to="/reset-password" className="font-medium text-blue-500 text-sm hover:text-blue-600">
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-4 pt-3">
              <Button
                disabled={isPending}
                type="submit"
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-500 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-600">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <div className="w-[100px] whitespace-nowrap rounded-full bg-white px-2 py-1 text-gray-500 text-xs">© Capsul {new Date().getFullYear()}</div>
      </div>
    </div>
  )
}

export default LoginPage
