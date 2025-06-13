import technoCityImage from "@/assets/images/techno-city-image.png"
import { GoogleIcon, Logo } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { toast } from "@/shared/lib/hooks/use-toast"
import { type ISignUpFormValues, signUpSchema } from "@/shared/lib/validations/auth"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"

const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

const defaultValues = {
  resolver: zodResolver(signUpSchema),
  defaultValues: {
    full_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
}

function SignupPage() {
  // Helpers
  // const { signUp, isLoaded } = useSignUp()
  // const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ISignUpFormValues>(defaultValues)

  // States
  const [captchaRequired, setCaptchaRequired] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const onSubmit = async (data: ISignUpFormValues) => {
    setIsPending(true)
    try {
      const { confirmPassword, ...credentials } = data
      await authApi.signUp({
        full_name: credentials.full_name,
        email: credentials.email,
        password: credentials.password
      })

      toast({
        title: "Elektron pochtangizni tasdiqlang",
        description: "Tasdiqlash kodi elektron pochtangizga yuborildi."
      })
      // navigate("/verify-email/:key")
    } catch (error: any) {
      if (error.response?.data?.code === "captcha_missing_token") {
        setCaptchaRequired(true)
        toast({
          title: "Xavfsizlik tekshiruvi",
          description: "Davom etish uchun CAPTCHA'ni to'ldiring.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Xato",
          description: error.response?.data?.message || "Hisob yaratib bo'lmadi. Iltimos, qayta urinib ko'ring.",
          variant: "destructive"
        })
      }
    } finally {
      setIsPending(false)
    }
  }

  const handleGoogleSignUp = async () => {
    // try {
    //   await signUp?.authenticateWithRedirect({
    //     strategy: "oauth_google",
    //     redirectUrl: "/sso-callback",
    //     redirectUrlComplete: "/main"
    //   })
    // } catch (err) {
    //   console.error("Google sign up failed", err)
    // }
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: `url(${technoCityImage})`,
        backgroundSize: "100%",
        backgroundPosition: "100% 60%"
      }}
    >
      {/* Left side - Login Form */}
      <div className="flex-grow" />
      <div className="flex w-full flex-col items-center justify-between lg:w-[40%] xl:pt-3 xl:pb-3 2xl:pt-12 2xl:pb-9">
        <div className="h-auto min-w-[480px] max-w-md space-y-8 rounded-xl bg-white p-8 pt-0 shadow-auth-card xl:pt-[3%] 2xl:pt-[7%]">
          {/* Logo */}
          <div className="xl:space-y-2 2xl:space-y-8">
            <Logo className="mx-auto h-[48px] w-[48px] text-white" />

            {/* Header */}
            <div className="text-center">
              <h2 className="font-semibold text-2xl text-gray-900 tracking-tight 2xl:text-3xl">Sign Up</h2>
              <p className="mt-2 text-dark-gray">Start your 30-day free trial.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[360px] space-y-4 2xl:space-y-6">
            <div>
              <Label htmlFor="name" className="block font-medium text-gray-700 text-sm">
                Name
              </Label>
              <div className="relative mt-1">
                <Input
                  id="name"
                  className="block h-10 w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                  {...register("full_name")}
                />
                {errors.full_name && <p className="text-destructive text-sm">{errors.full_name.message}</p>}
                {/*<Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />*/}
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="block font-medium text-gray-700 text-sm">
                Email
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  className="block h-10 w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                  {...register("email")}
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
                  className="block h-10 w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
                >
                  {/*{showPassword ? (*/}
                  {/*    <EyeOff className="h-5 w-5" />*/}
                  {/*) : (*/}
                  {/*    <Eye className="h-5 w-5" />*/}
                  {/*)}*/}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                Repeat Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="block h-10 w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
                >
                  {/*{showPassword ? (*/}
                  {/*    <EyeOff className="h-5 w-5" />*/}
                  {/*) : (*/}
                  {/*    <Eye className="h-5 w-5" />*/}
                  {/*)}*/}
                </button>
              </div>
            </div>

            {captchaRequired && (
              <div className="my-4 flex flex-col items-center">
                <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={token => setCaptchaToken(token)} theme="light" className="mb-2" />
                <Button
                  type="button"
                  className="mt-2 w-full"
                  disabled={!captchaToken || isPending}
                  onClick={() =>
                    handleSubmit(onSubmit)({
                      ...getValues(),
                      // @ts-ignore
                      confirmPassword: getValues().confirmPassword
                    })
                  }
                >
                  {isPending ? "Verifying..." : "Continue sign up"}
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-3">
              <Button
                disabled={isPending}
                type="submit"
                className="flex h-[48px] w-full select-none items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-500 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isPending ? "Creating account..." : "Get started"}
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 text-sm shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <GoogleIcon />
                Sign up with Google
              </Button>
            </div>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/" className="font-medium text-blue-500 hover:text-blue-600">
                Sign in
              </a>
            </p>
          </form>
        </div>
        <div className="w-[100px] whitespace-nowrap rounded-full bg-white px-2 py-1 text-gray-500 text-xs"> 2023 Capsul</div>
      </div>

      {/* Right side - Background Image */}
      {/*<div className="relative hidden h-screen p-5 lg:block lg:w-[60%]">*/}
      {/*    <div className="h-full overflow-hidden rounded-lg">*/}
      {/*        <img*/}
      {/*            src={technoCityImage}*/}
      {/*            alt="Scenic landscape"*/}
      {/*            className="h-full w-full object-cover object-bottom"*/}
      {/*        />*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default SignupPage
