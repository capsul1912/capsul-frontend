import { api } from "@/shared/lib/api/axios-interceptors"
import { toast } from "@/shared/lib/hooks/use-toast"
import { Button } from "@/shared/ui/button"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function VerifyEmailPage() {
  const { key } = useParams()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const verificationKey = key
  console.log("verificationKey", key)
  useEffect(() => {
    const verifyEmail = async () => {
      if (!verificationKey) {
        toast({
          title: "Xato",
          description: "Tasdiqlash kodi topilmadi.",
          variant: "destructive"
        })
        return
      }

      setIsPending(true)
      try {
        // Backend'ga POST so'rov yuborish
        await api.post("/auth/registration/verify-email/", { key: verificationKey })
        setIsVerified(true)
        toast({
          title: "Elektron pochta tasdiqlandi!",
          description: "Xush kelibsiz! Endi tizimga kirishingiz mumkin."
        })
      } catch (error: any) {
        toast({
          title: "Xato",
          description: error.response?.data?.message || "Elektron pochtani tasdiqlashda xato yuz berdi.",
          variant: "destructive"
        })
      } finally {
        setIsPending(false)
      }
    }

    verifyEmail()
  }, [verificationKey])

  // Login sahifasiga o'tish
  const handleLoginRedirect = () => {
    navigate("/login")
  }
  // Helpers
  // const { signUp, isLoaded } = useSignUp()
  // const navigate = useNavigate()

  // States
  // const [code, setCode] = useState("")
  // const [resent, setResent] = useState(false)
  // const [isPending, setIsPending] = useState(false)

  // Functions
  // const handleVerify = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!isLoaded) {
  //     toast({ title: "Error", description: "Auth service not loaded.", variant: "destructive" })
  //     return
  //   }
  //   setIsPending(true)
  //   try {
  //     const result = await signUp.attemptEmailAddressVerification({ code })
  //     if (result.status === "complete") {
  //       toast({ title: "Email verified!", description: "Welcome!" })
  //       navigate("/main")
  //     } else {
  //       toast({ title: "Action Required", description: "Further steps required.", variant: "destructive" })
  //     }
  //   } catch (error: any) {
  //     toast({
  //       title: "Error",
  //       description: error.errors?.[0]?.message || "Invalid code.",
  //       variant: "destructive"
  //     })
  //   } finally {
  //     setIsPending(false)
  //   }
  // }

  // const handleResend = async () => {
  //   if (!isLoaded) return
  //   setIsPending(true)
  //   try {
  //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
  //     setResent(true)
  //     toast({ title: "Code resent", description: "Check your email." })
  //   } catch {
  //     toast({ title: "Error", description: "Could not resend code.", variant: "destructive" })
  //   } finally {
  //     setIsPending(false)
  //   }
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
        {isPending && <h2 className="mb-6 font-bold text-2xl text-blue-700">Tasdiqlanmoqda...</h2>}
        {!isPending && isVerified && (
          <>
            <h2 className="mb-2 font-bold text-2xl text-blue-700">Muvaffaqiyat!</h2>
            <p className="mb-6 text-center text-gray-500">Elektron pochtangiz muvaffaqiyatli tasdiqlandi.</p>
            <Button onClick={handleLoginRedirect} className="w-full">
              Tizimga kirish
            </Button>
          </>
        )}
        {!isPending && !isVerified && (
          <>
            <h2 className="mb-2 font-bold text-2xl text-blue-700">Xato yuz berdi</h2>
            <p className="mb-6 text-center text-gray-500">Elektron pochtani tasdiqlashda xato yuz berdi. Iltimos, qayta urinib ko'ring.</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Bosh sahifaga qaytish
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
