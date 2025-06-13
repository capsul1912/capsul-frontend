// import technoCityImage from "@/assets/images/techno-city-image.png"
// import { GoogleIcon, Logo } from "@/shared/icons"
// import { toast } from "@/shared/lib/hooks/use-toast"
// import { type ISignUpFormValues, signInSchema } from "@/shared/lib/validations/auth"
// import { Button } from "@/shared/ui/button"
// import { Input } from "@/shared/ui/input"
// import { Label } from "@/shared/ui/label"
// import { useClerk, useSignIn } from "@clerk/clerk-react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Eye, EyeOff, Mail } from "lucide-react"
// import { useCallback, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"

// function LoginPage() {
//   // Helper
//   const navigate = useNavigate()
//   const { signIn: clerkSignIn, isLoaded: isUserLoaded, setActive } = useSignIn()
//   const { session } = useClerk()

//   // States
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [isPending, setIsPending] = useState(false)

//   // Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<ISignUpFormValues>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: ""
//       // rememberMe: false,
//     }
//   })

//   useEffect(() => {
//     if (isUserLoaded && clerkSignIn && session) {
//       navigate("/main", { replace: true })
//     }
//   }, [isUserLoaded, clerkSignIn, navigate])

//   // Functions
//   const onSubmit = async (data: ISignUpFormValues) => {
//     if (!isUserLoaded) {
//       toast({
//         title: "Error",
//         description: "Auth service not loaded. Please try again.",
//         variant: "destructive"
//       })
//       return
//     }
//     setIsPending(true)
//     try {
//       const result = await clerkSignIn.create({
//         identifier: data.email,
//         password: data.password
//       })
//       if (result.status === "complete") {
//         await setActive({ session: result.createdSessionId })
//         toast({
//           title: `Welcome back!`,
//           description: "You've successfully signed in."
//         })
//         navigate("/main")
//       } else {
//         toast({
//           title: "Action Required",
//           description: "Additional authentication steps required.",
//           variant: "destructive"
//         })
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.errors?.[0]?.message || "Invalid email or password. Please try again.",
//         variant: "destructive"
//       })
//     } finally {
//       setIsPending(false)
//     }
//   }

//   const handleGoogleSignUp = useCallback(async () => {
//     if (!isUserLoaded) {
//       console.log("Clerk sign in is not loaded yet.")
//       return
//     }
//     try {
//       // Use the clerkSignIn object from useSignIn
//       await clerkSignIn.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback", // Where Google sends user back
//         redirectUrlComplete: "/main" // Where user lands after Clerk processes callback
//       })
//     } catch (err) {
//       console.error("Google OAuth error:", err)
//       // Add user-facing error handling if needed
//     }
//   }, [isUserLoaded, clerkSignIn])

//   return (
//     <div
//       className={`flex min-h-screen bg-no-repeat transition ${!isUserLoaded ? "animate-pulse blur-md duration-[1.5s]" : ""}`}
//       style={{
//         backgroundImage: `url(${technoCityImage})`,
//         backgroundSize: "100%",
//         backgroundPosition: "100% 60%"
//       }}
//     >
//       {/* Left side - Login Form */}
//       <div className="flex-grow" />
//       <div className="flex w-full flex-col items-center justify-between xl:w-[40%] xl:pt-10 xl:pb-3 2xl:pt-20 2xl:pb-5">
//         <div className="h-auto min-h-[628px] min-w-[480px] max-w-md space-y-8 rounded-xl bg-white p-8 pt-[7%] shadow-auth-card">
//           {/* Logo */}
//           <Logo className="mx-auto h-[48px] w-[48px] text-white" />

//           {/* Header */}
//           <div className="text-center">
//             <h2 className="font-semibold text-3xl text-gray-900 tracking-tight">Welcome to Capsul</h2>
//             <p className="mt-2 text-dark-gray">Welcome back! Please enter your details.</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[360px] space-y-6">
//             <div>
//               <Label htmlFor="email" className="block font-medium text-gray-700 text-sm">
//                 Email
//               </Label>
//               <div className="relative mt-1">
//                 <Input
//                   id="email"
//                   // name="email"
//                   type="email"
//                   // onChange={e => setEmail(e.target.value)}
//                   {...register("email")}
//                   className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Your email"
//                 />
//                 {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
//                 <Mail className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="password" className="block font-medium text-gray-700 text-sm">
//                 Password
//               </Label>
//               <div className="relative mt-1">
//                 <Input
//                   id="password"
//                   // name="password"
//                   type={showPassword ? "text" : "password"}
//                   // onChange={e => setPassword(e.target.value)}
//                   {...register("password")}
//                   className="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={e => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-gray-700 text-sm">
//                   Remember me
//                 </label>
//               </div>
//               <a href="/" className="font-medium text-blue-500 text-sm hover:text-blue-600">
//                 Forgot password?
//               </a>
//             </div>

//             <div className="flex flex-col gap-4 pt-3">
//               <Button
//                 disabled={isPending}
//                 type="submit"
//                 className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-500 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 {isPending ? "Signing in..." : "Sign in"}
//               </Button>
//               <Button
//                 onClick={handleGoogleSignUp}
//                 type="button"
//                 className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 text-sm shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 <GoogleIcon />
//                 Sign in with Google
//               </Button>
//             </div>

//             <p className="text-center text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <a href="/signup" className="font-medium text-blue-500 hover:text-blue-600">
//                 Sign up
//               </a>
//             </p>
//           </form>
//         </div>
//         <div className="w-[100px] whitespace-nowrap rounded-full bg-white px-2 py-1 text-gray-500 text-xs">© Capsul {new Date().getFullYear()}</div>
//       </div>

//       {/* Right side - Background Image */}
//       {/*<div className="relative hidden h-screen p-5 lg:block lg:w-[60%]">*/}
//       {/*    <div className="h-full overflow-hidden rounded-lg">*/}
//       {/*<img*/}
//       {/*    src={technoCityImage}*/}
//       {/*    alt="Scenic landscape"*/}
//       {/*    className="h-full w-full object-cover object-bottom"*/}
//       {/*/>*/}
//       {/*    </div>*/}
//       {/*</div>*/}
//     </div>
//   )
// }

// export default LoginPage
