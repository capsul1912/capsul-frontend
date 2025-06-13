import { api } from "@/shared/lib/api/axios-interceptors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProjectAPIKey, ProjectAPIKeyCreate } from "./types"
import { projectApiKeysKeys } from "./use-fetch-project-api-keys"

export const useCreateProjectApiKey = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ProjectAPIKeyCreate) => {
      const response = await api.post<ProjectAPIKey>(`/inbox/project-api-keys/`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectApiKeysKeys.all() })
    },
    onError: error => {
      console.error("Error creating project API key:", error)
    }
  })
}
