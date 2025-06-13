import type { ISignInFormValues, ISignUpFormValues } from "@/shared/lib/validations/auth.ts"
import { api } from "./axios-interceptors"

// Types for API responses
export interface AuthResponse {
  access: string
  refresh: string
}

// Type for the user response
export interface IUser {
  id: string
  username: string
  email: string
  full_name: string
  role: string
  phone_number: string | null
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
  last_login: string
  password: string
  current_organization: string
  team: string | null
  // groups: any[]; // agar grouplar boshqa turdagi object bo'lsa, ularni alohida interface qilib yozish mumkin
  // user_permissions: any[]; // bu ham xuddi shunday
}

// Type for reset password response
export interface ResetPasswordResponse {
  detail?: string
}

// Type for reset password confirm request
export interface ResetPasswordConfirmRequest {
  new_password1: string
  new_password2: string
  uid: string
  token: string
}

// Auth API functions
export const authApi = {
  signUp: async (data: Omit<ISignUpFormValues, "confirmPassword">) => {
    const response = await api.post<AuthResponse>("/auth/registration/", data)
    return response.data
  },

  signIn: async (data: Omit<ISignInFormValues, "rememberMe">) => {
    const response = await api.post<AuthResponse>("/auth/login/", data)
    return response.data
  },

  getUser: async () => {
    const response = await api.get<IUser>("/accounts/me/")
    return response.data
  },

  resetPassword: async (data: { email: string }) => {
    const response = await api.post<ResetPasswordResponse>("/auth/password/reset/", data)
    return response.data
  },

  resetPasswordConfirm: async (data: ResetPasswordConfirmRequest) => {
    const response = await api.post<ResetPasswordConfirmRequest>("/auth/password/reset/confirm/", data)
    return response.data
  }
}
