import { InboxProvider } from "@/app/context/inbox-context"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export const InboxLayout: React.FC = () => {
  return (
    <InboxProvider>
      <Stack className="no-padding" direction="row" alignItems="stretch" width="100%" sx={{ flex: 1, height: "100vh" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            // px: 3,
            // pb: 5,
            // mt: { xs: 8, md: 0 },
            overflowY: "auto"
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </InboxProvider>
  )
}
