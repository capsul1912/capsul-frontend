import { getAuthToken, getRefreshToken, setAuthToken } from "@/api/cookies"
import axios from "axios"
import { useAuthStore } from "../store/auth-store"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.request.use(
  async config => {
    if (config.url === "/auth/registration/" || config.url === "/auth/registration/verify-email/" || config.url === "/auth/login/") {
      return config
    }
    const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // if (!("Content-Type" in config.headers))
    //   config.headers["Content-Type"] = "application/json";
    // config.headers.Accept = "*/*";
    return config
  },
  error => Promise.reject(error)
)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          try {
            const response = await axios.post("/auth/token/refresh/", {
              refresh: refreshToken
            })
            const { access } = response.data
            setAuthToken(access)
            originalRequest.headers.Authorization = `Bearer ${access}`

            return api(originalRequest)
          } catch (err) {
            const logout = useAuthStore.getState().logout
            logout()
            window.location.href = "/login"
          }
        } else {
          console.error("Refresh token not found")
          const logout = useAuthStore.getState().logout
          logout()
          window.location.href = "/login"
        }
      }
      // else if (error.request) {
      //   throw new Error("No response from server. Please check your internet connection")
      // } else {
      //   throw new Error("An unexpected error occurred")
      // }
    }

    return Promise.reject(error)
  }
)
