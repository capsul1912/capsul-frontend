import { api } from "@/shared/lib/api/axios-interceptors"
import { useQuery } from "@tanstack/react-query"
import type { ProjectAPIKeyListResponse } from "./types"

export const projectApiKeysKeys = {
  all: () => [{ entity: "project-api-keys" } as const],
  detail: (id: string) => [...projectApiKeysKeys.all(), { id } as const]
} as const

interface IParams {
  project?: string
  name?: string
  active?: string
  search?: string
  ordering?: string
  limit?: number
  offset?: number
}

export const useFetchProjectApiKeys = (params: IParams) => {
  return useQuery({
    queryKey: projectApiKeysKeys.all(),
    queryFn: async () => {
      const response = await api.get<ProjectAPIKeyListResponse>(`/inbox/project-api-keys`, { params })
      return response.data
    }
  })
}
