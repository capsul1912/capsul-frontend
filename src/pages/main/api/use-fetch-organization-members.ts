import type { IUser } from "@/shared/lib/api/auth-api"
import { api } from "@/shared/lib/api/axios-interceptors"

import { useQuery } from "@tanstack/react-query"

export interface IOrganizationMemberParams {
  organizationId: string | null
  search?: string
  ordering?: string
  limit?: number
  offset?: number
}

export interface IOrganizationMember {
  id: string
  name: string
  description: string | null
  logo: string | null
  created_at: string
  user: IUser
}
export interface IOrganizationMembersResponse {
  count: number
  next: string | null
  previous: string | null
  results: IOrganizationMember[]
}
export const membersKeys = {
  all: ["projects"] as const,
  lists: () => [...membersKeys.all, "list"] as const,
  list: (filters: string) => [...membersKeys.lists(), { filters }] as const,
  details: () => [...membersKeys.all, "detail"] as const,
  detail: (id: string) => [...membersKeys.details(), id] as const
}

// Hook
export const useFetchOrganizationMembers = (params?: IOrganizationMemberParams) => {
  return useQuery({
    queryKey: membersKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<IOrganizationMember[]>(`/inbox/organizations/${params?.organizationId}/members/`, {
        params
      })
      return response.data
    }
  })
}
