import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { projectKeys } from "./use-post-project.ts"
export interface IProjectParams {
  organization?: string
  name?: string
  use_cache?: string
  use_annotation?: string
  search?: string
  ordering?: string
  limit?: number
  offset?: number
}

export interface IProjectResponse {
  id: string
  name: string
  collection: string
  collection_name: string
  use_cache: boolean
  use_annotation: boolean
  agent_switch: boolean
  organization: string | null
  organization_name: string | null
  created_at: string
  updated_at: string
}

export interface IProjectsResponse {
  count: number
  next: string | null
  previous: string | null
  results: IProjectResponse[]
}

export const useFetchProjects = (params?: IProjectParams) => {
  return useQuery({
    queryKey: projectKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<IProjectsResponse>("/inbox/projects/", {
        params
      })
      return response.data
    }
  })
}
export const useFetchProjectById = (projectId: string) => {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: async () => {
      const response = await api.get<IProjectResponse>(`/inbox/projects/${projectId}/`)
      return response.data
    },
    enabled: !!projectId // Only run query if projectId is provided
  })
}
export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      projectId,
      data
    }: {
      projectId: string
      data: Partial<IProjectResponse>
    }) => {
      const response = await api.patch<IProjectResponse>(`/inbox/projects/${projectId}/`, data)
      return response.data
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId)
      })
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
    }
  })
}

// Delete project
export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (projectId: string) => {
      await api.delete(`/inbox/projects/${projectId}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
    }
  })
}
