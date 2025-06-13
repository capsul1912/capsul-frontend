import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./axios-interceptors"

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

interface ITeamsParams {
  limit?: number
  offset?: number
}
export interface ICreateTeamPayload {
  name: string
}
export interface IUpdateTeamPayload {
  name?: string
  icon?: string | null
  organization_name?: string
}
// Query keys
export const teamsKeys = {
  all: ["teams"] as const,
  lists: () => [...teamsKeys.all, "list"] as const,
  list: (filters: string) => [...teamsKeys.lists(), { filters }] as const,
  details: () => [...teamsKeys.all, "detail"] as const,
  detail: (id: string) => [...teamsKeys.details(), id] as const
}

// Get all teams
export const useTeams = (params?: ITeamsParams) => {
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
export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTeam: ICreateTeamPayload) => {
      const response = await api.post<ITeam>("accounts/teams/", newTeam)
      return response.data
    },
    onSuccess: newTeam => {
      const previousTeams = queryClient.getQueryData<ITeam[]>(teamsKeys.lists()) || []
      queryClient.setQueryData(teamsKeys.lists(), [newTeam, ...previousTeams])
      queryClient.invalidateQueries({ queryKey: teamsKeys.lists() })
    },
    onError: error => {
      console.error("Error creating team:", error)
    }
  })
}
export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload
    }: {
      id: number
      payload: IUpdateTeamPayload
    }) => {
      const response = await api.put<ITeam>(`accounts/teams/${id}/`, payload)
      return response.data
    },
    onSuccess: updatedTeam => {
      queryClient.setQueryData<ITeamResponse>(teamsKeys.lists(), oldData => {
        if (!oldData) return oldData
        return {
          ...oldData,
          results: oldData.results.map(team => (team.id === updatedTeam.id ? updatedTeam : team))
        }
      })
      queryClient.invalidateQueries({ queryKey: teamsKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: teamsKeys.detail(updatedTeam.id.toString())
      })
    },
    onError: error => {
      console.error("Error updating team:", error)
    }
  })
}

// Delete a team
export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`accounts/teams/${id}/`)
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<ITeamResponse>(teamsKeys.lists(), oldData => {
        if (!oldData) return oldData
        return {
          ...oldData,
          count: oldData.count - 1,
          results: oldData.results.filter(team => team.id !== id)
        }
      })
      queryClient.invalidateQueries({ queryKey: teamsKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: teamsKeys.detail(id.toString())
      })
    },
    onError: error => {
      console.error("Error deleting team:", error)
    }
  })
}
