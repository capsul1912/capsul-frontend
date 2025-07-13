import { ChatProvider } from "@/app/context/chat-context.tsx"
import { useFetchTelegramMessages } from "@/features/telegram-bot/api/use-fetch-telegram-messages"
import { ChatSection } from "@/widgets/chat-section/chat-section.tsx"
import RightAside from "@/widgets/right-aside/right-aside"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"
import React from "react"

const drawerWidth = 340

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  position: "relative",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: theme.spacing(0)
      }
    }
  ]
}))

export const InboxPage: React.FC = () => {
  const [open, setOpen] = React.useState(true)

  useFetchTelegramMessages()
  return (
    <ChatProvider>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Main open={open}>
          <ChatSection />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth
            }
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <RightAside />
        </Drawer>
      </Box>
    </ChatProvider>
  )
}
