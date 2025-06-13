import { getAuthToken } from "@/api/cookies"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }: PropsWithChildren) {
  // Functions
  const isAuthenticated = getAuthToken()

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
