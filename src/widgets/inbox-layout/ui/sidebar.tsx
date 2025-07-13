import { useFetchTickets } from "@/entities/ticket/api/use-fetch-tickets.ts"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { mergeArray } from "@/shared/lib/utils"
import { SidebarProvider } from "@/shared/ui/sidebar.tsx"
import EmailIcon from "@mui/icons-material/AlternateEmail"
import PeopleIcon from "@mui/icons-material/People"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import RobotIcon from "@mui/icons-material/SmartToy"
import Avatar from "@mui/material/Avatar"
import { ThemeProvider } from "@mui/material/styles"
import deepmerge from "@mui/utils/deepmerge"
import { useEffect } from "react"
import React from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { useTicketsStore } from "../model/store"
import type { ItemProp } from "../types"
import { ChatSelectSidebar } from "./chat-select"
import { InboxSidebar } from "./inbox"
import { SidebarWrapper } from "./sidebar-components"
import { innerTheme } from "./theme"

export const Sidebar: React.FC = () => {
  // Helpers
  const { projectId } = useParams()
  const [params, setTicketIdParam] = useSearchParams()
  const ticketId = params.get("ticketId")

  // Store
  const { user } = useAuthStore()
  const { setFilters, filters } = useTicketsStore()
  const { setCurrentTicket, setChatLoading } = useChatStore()
  // const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  // Queries
  const { data: ticketsResponse, isPending: ticketsLoading } = useFetchTickets({
    team: filters.teamId || undefined,
    status: filters.status && filters.status !== "ALL" ? filters.status : undefined,
    assignee: filters.mainFilter === "MY_INBOX" && user?.id ? user?.id : undefined,
    mentioned_user: filters.mainFilter === "MENTIONS" && user?.id ? user?.id : undefined,
    session__project: projectId || undefined
  })
  // const { data: integrationsResponse, isPending: integrationsLoading } = useFetchIntegrations({
  //   project_id: projectId
  // })

  const tickets = ticketsResponse?.results
  // const integrations = integrationsResponse?.results

  const inboxItems = React.useMemo(
    () =>
      mergeArray<ItemProp>(
        {
          text: "My inbox",
          icon: <Avatar sizes="small" alt={user?.full_name} sx={{ width: 16, height: 16, m: "2px" }} />,
          filterType: "MY_INBOX"
        },
        {
          text: "All",
          icon: <PeopleIcon />,
          filterType: "ALL"
        },
        {
          text: "Unassigned",
          icon: <PersonRemoveIcon />,
          filterType: "UNASSIGNED"
        },
        {
          text: "Mentions",
          icon: <EmailIcon />,
          filterType: "MENTIONS"
        },
        {
          text: "Agent",
          icon: <RobotIcon />,
          filterType: "AGENT"
        }
      ).map(item =>
        typeof item.filterType === "string"
          ? deepmerge(item, {
              MuiListItemButton: {
                selected: filters.mainFilter === item.filterType,
                onClick: () => setFilters({ mainFilter: item.filterType, teamId: null })
              }
            })
          : item
      ),
    [user, filters]
  )

  // Effects
  useEffect(() => {
    if (tickets?.length) {
      if (!ticketId) {
        setCurrentTicket(tickets[0])
        setTicketIdParam(prev => {
          const params = new URLSearchParams(prev)
          params.set("ticketId", tickets[0].id)
          return params
        })
      } else {
        setCurrentTicket(tickets.find(t => t.id === ticketId) || null)
      }
    }
  }, [tickets])

  // Sync ticketsLoading with chatLoading in Zustand store
  useEffect(() => {
    setChatLoading(ticketsLoading)
  }, [ticketsLoading])

  return (
    <>
      <ThemeProvider theme={innerTheme}>
        <SidebarProvider>
          <SidebarWrapper>
            <InboxSidebar open={sidebarOpen} items={inboxItems} />
            <ChatSelectSidebar open={sidebarOpen} setOpen={setSidebarOpen} items={inboxItems} tickets={tickets} ticketsLoading={ticketsLoading} />
          </SidebarWrapper>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
