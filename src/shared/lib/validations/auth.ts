import { z } from "zod"

export const signUpSchema = z
  .object({
    full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter"
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter"
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number"
      }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional().default(false)
})

// Yangi reset parol sxemasi
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter"
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter"
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number"
      }),
    confirmPassword: z.string()
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export type ISignUpFormValues = z.infer<typeof signUpSchema>
export type ISignInFormValues = z.infer<typeof signInSchema>
export type IResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
