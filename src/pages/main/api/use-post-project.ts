import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface IProjectResponse {
  id: string
  name: string
  use_cache: boolean
  use_annotation: boolean
  organization: string | null
  created_at: string
}

export interface ICreateProjectPayload {
  name: string
  use_cache?: boolean
  use_annotation?: boolean
  organization: string
}
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const
}
export const usePostProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ICreateProjectPayload) => {
      const response = await api.post<IProjectResponse>("/inbox/projects/", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
    },
    onError: error => {
      console.error("Error posting project:", error)
    }
  })
}
