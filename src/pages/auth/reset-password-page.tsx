import technoCityImage from "@/assets/images/techno-city-image.png"
import { Logo } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { toast } from "@/shared/lib/hooks/use-toast"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Validatsiya sxemasi
const resetPasswordSchema = z.object({
  email: z.string().email("Noto‘g‘ri email manzili")
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

function ResetPasswordPage() {
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })

  // Queries
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: data => {
      console.log("Parolni tiklash muvaffaqiyatli:", data)
      toast({
        title: "Muvaffaqiyat",
        description: "Parolni tiklash havolasi emailingizga yuborildi."
      })
    },
    onError: (error: any) => {
      console.error("Parolni tiklash xatosi:", error)
      const errorMessage = error?.response?.data?.detail || "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."
      toast({
        title: "Xato",
        description: errorMessage,
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: ResetPasswordFormValues) => {
    // setEmail(data.email)
    resetPassword({ email: data.email })
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
      <div className="flex w-full flex-col items-center justify-between xl:w-[40%] xl:pt-10 xl:pb-3 2xl:pt-20 2xl:pb-5">
        <div className="h-auto min-w-[480px] max-w-md space-y-8 rounded-xl bg-white p-8 pt-[7%] shadow-auth-card">
          {/* Logo */}
          <Logo className="mx-auto h-[48px] w-[48px] text-white" />

          {/* Header */}
          <div className="text-center">
            <h2 className="font-semibold text-3xl text-gray-900 tracking-tight">Parolingizni unutdingizmi?</h2>
            <p className="mt-2 text-dark-gray">Xavotir olmang! Parolingizni tiklaymiz va yangi parol yaratish uchun havola yuboramiz.</p>
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
                  placeholder="Sizning emailingiz"
                />
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                <Mail className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                disabled={isPending}
                type="submit"
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-500 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isPending ? "Yuborilmoqda..." : "Parolni tiklash"}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[100px] whitespace-nowrap rounded-full bg-white px-2 py-1 text-gray-500 text-xs">© Capsul {new Date().getFullYear()}</div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
