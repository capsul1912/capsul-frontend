import { ChatProvider } from "@/app/context/chat-context.tsx"
import { useChatStore } from "@/features/chat/model/chat.store"
import { useFetchTelegramMessages } from "@/features/telegram-bot/api/use-fetch-telegram-messages"
import { ChatSection } from "@/widgets/chat-section/chat-section.tsx"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import React from "react"
import type { TabValue } from "../types"
import { PageHeader, PageMain, PagePaper, SidebarDrawer } from "./components"

export const InboxPage: React.FC = () => {
  const [open] = React.useState(false)
  const [tab, setTab] = React.useState<TabValue>("details")
  const { currentTicket } = useChatStore()
  console.log("Current ticket:", currentTicket)

  useFetchTelegramMessages()
  return (
    <ChatProvider>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <PageMain open={open}>
          <PagePaper>
            <PageHeader>
              <Typography fontSize={20} fontWeight={500} ml={1}>
                Messenger
              </Typography>
            </PageHeader>

            <ChatSection />
          </PagePaper>
        </PageMain>
        <SidebarDrawer variant="persistent" anchor="right" open={open}>
          <TabContext value={tab}>
            <TabList onChange={(_, value) => setTab(value)}>
              <Tab value="details" label="Details" />
              <Tab value="copilot" label="Copilot" />
            </TabList>

            <TabPanel value="details">{currentTicket && <pre>{JSON.stringify(currentTicket, null, 2)}</pre>}</TabPanel>
            <TabPanel value="copilot">copilot</TabPanel>
          </TabContext>
        </SidebarDrawer>
      </Box>
    </ChatProvider>
  )
}
