import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import React from "react"
import { Outlet } from "react-router-dom"
import { LayoutMain } from "./layout-components"
import { Sidebar } from "./sidebar"

const drawerWidth = 200

export type DashboardLayoutProps = {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [pinned, setPinned] = React.useState(false)

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar width={drawerWidth} pinned={pinned} setPinned={setPinned} />
      <LayoutMain width={drawerWidth} pinned={pinned}>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            minHeight: "100vh",
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
