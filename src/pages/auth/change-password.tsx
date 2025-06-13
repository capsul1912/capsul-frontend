import { Logo } from "@/shared/icons"
import { type ResetPasswordConfirmRequest, authApi } from "@/shared/lib/api/auth-api"
import { type IResetPasswordFormValues, resetPasswordSchema } from "@/shared/lib/validations/auth"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"

const SetNewPassword = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const uid = searchParams.get("uid")
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: IResetPasswordFormValues) => {
    if (!uid || !token) {
      setApiError("Invalid URL: Missing uid or token.")
      return
    }

    setIsLoading(true)
    setApiError(null)
    setSuccessMessage(null)

    try {
      const requestData: ResetPasswordConfirmRequest = {
        new_password1: data.newPassword,
        new_password2: data.confirmPassword,
        uid,
        token
      }

      const response = await authApi.resetPasswordConfirm(requestData)
      setSuccessMessage(response.new_password1 || "Password successfully reset!")
      navigate("/login")
    } catch (error: any) {
      setApiError(error.response?.data?.detail || "Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo className="mx-auto h-[48px] w-[48px] text-white" />
          </div>
          <CardTitle className="font-bold text-2xl">SET NEW PASSWORD</CardTitle>
          <p className="text-gray-500">Just enter a new password below and confirm it.</p>
        </CardHeader>
        <CardContent>
          {successMessage && <p className="mb-4 text-green-500 text-sm">{successMessage}</p>}
          {apiError && <p className="mb-4 text-red-500 text-sm">{apiError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password Input */}
            <div>
              <label htmlFor="newPassword" className="font-medium text-sm">
                New Password
              </label>
              <Input id="newPassword" type="password" placeholder="••••••••" {...register("newPassword")} className="mt-1" />
              {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>

            {/* Repeat New Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="font-medium text-sm">
                Repeat new password
              </label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} className="mt-1" />
              {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Processing..." : "CHANGE PASSWORD"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SetNewPassword
