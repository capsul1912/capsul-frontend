import type { ITicketStatus } from "@/entities/ticket/types.ts"
import type { IMainFilterType } from "@/widgets/menu-sidebar/ui/menu-sidebar.tsx"
import { create } from "zustand"

type ITicketsFilter = {
  teamId: number | null
  integrationId: string | null
  status: ITicketStatus | "ALL" | null
  mainFilter: IMainFilterType | null
  inboxTypeId: number | null
}

export interface ITicketsStore {
  filters: ITicketsFilter
  setFilters: (f: Partial<ITicketsFilter>) => void
}

export const useTicketsStore = create<ITicketsStore>(set => ({
  filters: {
    inboxTypeId: null,
    teamId: null,
    integrationId: null,
    status: null,
    mainFilter: "ALL"
  },
  setFilters: filters =>
    set(state => ({
      filters: {
        ...state.filters,
        ...filters
      }
    }))
}))
