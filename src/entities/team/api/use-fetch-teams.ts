import type { ITicketPriority, ITicketStatus } from "@/entities/ticket/types.ts"
import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useQuery } from "@tanstack/react-query"

export interface ITeam {
  id: number
  name: string
  created_at: string
  updated_at: string
  icon: string | null
  icon_url: string | null
  organization_name: string
  members_count: string
}

export interface ITeamResponse {
  count: number
  next: string | null
  previous: string | null
  results: ITeam[]
}

export interface ITeamsParams {
  status?: ITicketStatus
  priority?: ITicketPriority
  assignee?: string
  team?: string
  session?: string
  created_at_after?: string
  created_at_before?: string
  mentioned_user?: string
  search?: string
  ordering?: string
  limit?: number
  offset?: number
}

export const teamsKeys = {
  all: ["teams"] as const,
  lists: () => [...teamsKeys.all, "list"] as const,
  list: (filters: string) => [...teamsKeys.lists(), { filters }] as const,
  details: () => [...teamsKeys.all, "detail"] as const,
  detail: (id: string) => [...teamsKeys.details(), id] as const
}

export const useFetchTeams = (params?: ITeamsParams) => {
  return useQuery({
    queryKey: teamsKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<ITeamResponse>("accounts/teams/", {
        params
      })
      return response.data
    }
  })
}
