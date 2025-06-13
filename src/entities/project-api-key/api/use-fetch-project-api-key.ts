import { api } from "@/shared/lib/api/axios-interceptors"
import { useQuery } from "@tanstack/react-query"
import type { ProjectAPIKey } from "./types"
import { projectApiKeysKeys } from "./use-fetch-project-api-keys"

export const fetchProjectApiKey = async (id: string) => {
  const response = await api.get<ProjectAPIKey>(`/inbox/project-api-keys/${id}/`)
  return response.data
}

export const useFetchProjectApiKey = (id: string) => {
  return useQuery({
    queryKey: projectApiKeysKeys.detail(id),
    queryFn: () => fetchProjectApiKey(id),
    enabled: !!id
  })
}
