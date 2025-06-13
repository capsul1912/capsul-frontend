import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useQuery } from "@tanstack/react-query"

export interface IOrganizationParams {
  offset?: number
  limit?: number
}

export interface IOrganization {
  id: string
  name: string
  description: string | null
  logo: string | null
  created_at: string
}

interface IOrganizationResponse {
  count: number
  next: string | null
  previous: string | null
  results: IOrganization[]
}

export const organizationKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationKeys.all, "list"] as const,
  list: (filters: string) => [...organizationKeys.lists(), { filters }] as const,
  details: () => [...organizationKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const
}

export const useFetchOrganizations = (params?: IOrganizationParams) => {
  return useQuery({
    queryKey: organizationKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<IOrganizationResponse>("/inbox/organizations/", {
        params
      })
      return response.data
    }
  })
}

export const useFetchOrganizationById = (organizationId: string) => {
  return useQuery({
    queryKey: organizationKeys.detail(organizationId),
    queryFn: async () => {
      const response = await api.get<IOrganization>(`/inbox/organizations/${organizationId}/`)
      return response.data
    },
    enabled: !!organizationId
  })
}
