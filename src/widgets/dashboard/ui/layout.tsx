import { getAuthToken } from "@/api/cookies"
import { authApi } from "@/shared/lib/api/auth-api"
import { useAuthStore } from "@/shared/lib/store/auth-store"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { LayoutMain } from "./layout-components"
import { Sidebar } from "./sidebar"

const drawerWidth = 200

export type DashboardLayoutProps = {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [pinned, setPinned] = React.useState(false)
  const navigate = useNavigate()

  const { setUser } = useAuthStore()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  React.useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login")
    }
  }, [navigate])

  React.useEffect(() => {
    if (user) setUser(user)
  }, [user])

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar width={drawerWidth} pinned={pinned} setPinned={setPinned} />
      <LayoutMain width={drawerWidth} pinned={pinned}>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            minHeight: "100vh",
            maxHeight: "100vh",
            "&:not(:has(.no-padding))": {
              px: 3,
              pb: 5,
              mt: { xs: 8, md: 0 }
            }
          }}
        >
          <Outlet />
        </Stack>
      </LayoutMain>
    </Box>
  )
}
