import { useFetchTeams } from "@/entities/team/api/use-fetch-teams"
import type { ITicket } from "@/entities/ticket/types"
import { SessionCardItem } from "@/pages/main-page/components/sidebar-menu-button.tsx"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import type React from "react"
import { useTicketsStore } from "../model/store"
import type { ItemProp } from "../types"
import { ChatSelectHeader, ChatSelectListWrapper, ChatSelectMain } from "./chat-select-components"

export const ChatSelectSidebar: React.FC<{
  open?: boolean
  setOpen?: (cb: React.SetStateAction<boolean>) => void
  items: ItemProp[]
  tickets?: ITicket[]
  ticketsLoading?: boolean
}> = ({ open = true, setOpen = () => {}, items, tickets, ticketsLoading }) => {
  const { filters } = useTicketsStore()
  const { data: teamsResponse } = useFetchTeams()
  const teams = teamsResponse?.results

  return (
    <ChatSelectMain open={open}>
      <ChatSelectHeader open={open} setOpen={setOpen}>
        {filters.mainFilter ? items.find(i => i.filterType === filters.mainFilter)?.text : teams?.find(team => team.id === filters.teamId)?.name}
      </ChatSelectHeader>
      <ChatSelectListWrapper>
        <List component={Stack} gap={0.8} dense>
          {!ticketsLoading && tickets?.map((ticket, i) => <SessionCardItem chat={ticket} key={i} index={i} />)}
        </List>
      </ChatSelectListWrapper>
    </ChatSelectMain>
  )
}
