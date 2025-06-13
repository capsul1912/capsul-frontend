import { removeAuthTokens } from "@/api/cookies.ts"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  username: string
  email: string
  full_name: string
  password: string
  role: string
  current_organization: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  is_verified: boolean
  last_login: string
  created_at: string
  updated_at: string
  phone_number: string | null
  team: string | null
  //   groups: string[]; // yoki object[] bo'lishi mumkin, agar group detallari bo'lsa
  //   user_permissions: string[]; // yoki object[] bo'lishi mumkin
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  rememberMe: boolean
  setUser: (user: User | null) => void
  setAuthenticated: (status: boolean) => void
  setRememberMe: (status: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      setUser: user => set({ user }),
      setAuthenticated: status => set({ isAuthenticated: status }),
      setRememberMe: status => set({ rememberMe: status }),
      logout: () => {
        removeAuthTokens()
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: "auth-storage",
      partialize: state =>
        state.rememberMe
          ? {
              user: state.user,
              isAuthenticated: state.isAuthenticated,
              rememberMe: state.rememberMe
            }
          : { rememberMe: state.rememberMe }
    }
  )
)
