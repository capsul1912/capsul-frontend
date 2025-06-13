import type { ITicket, ITicketPriority, ITicketStatus } from "@/entities/ticket/types.ts"
import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useQuery } from "@tanstack/react-query"

export interface ITicketsResponse {
  count: number
  next?: string | null
  previous?: string | null
  results: ITicket[]
}

export interface ITicketsParams {
  status?: ITicketStatus
  priority?: ITicketPriority
  assignee?: string
  team?: number
  session__project?: string
  created_at_after?: string
  created_at_before?: string
  mentioned_user?: string
  search?: string
  ordering?: string
  limit?: number
  offset?: number
}

export const ticketsKeys = {
  all: ["tickets"] as const,
  lists: () => [...ticketsKeys.all, "list"] as const,
  list: (filters: string) => [...ticketsKeys.lists(), { filters }] as const,
  details: () => [...ticketsKeys.all, "detail"] as const,
  detail: (id: string) => [...ticketsKeys.details(), id] as const
}

export const useFetchTickets = (params?: ITicketsParams) => {
  return useQuery({
    queryKey: ticketsKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<ITicketsResponse>("/inbox/tickets/", {
        // const response = await api.get<ITicketsResponse>("/me/", {
        params
      })
      return response.data
    }
  })
}
