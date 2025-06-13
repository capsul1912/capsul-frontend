import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { organizationKeys } from "./use-fetch-organization.ts"

export interface IOrganizationResponse {
  id: string
  name: string
  logo: string | null
  created_at: string
}
export const usePostOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<IOrganizationResponse>("/inbox/organizations/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all })
    },
    onError: error => {
      console.error("Error posting :", error)
    }
  })
}
