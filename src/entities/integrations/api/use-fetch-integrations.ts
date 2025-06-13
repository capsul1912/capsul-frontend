import { api } from "@/shared/lib/api/axios-interceptors"
import { useQuery } from "@tanstack/react-query"
import type { IIntegrationsParams, IIntegrationsResponse } from "../types"

export const integrationsKeys = {
  all: ["integrations"] as const,
  lists: () => [...integrationsKeys.all, "list"] as const,
  list: (filters: string) => [...integrationsKeys.lists(), { filters }] as const,
  details: () => [...integrationsKeys.all, "detail"] as const,
  detail: (id: string) => [...integrationsKeys.details(), id] as const
}

export const useFetchIntegrations = (params?: IIntegrationsParams) => {
  return useQuery({
    queryKey: integrationsKeys.list(JSON.stringify(params)),
    queryFn: async () => {
      const response = await api.get<IIntegrationsResponse>("/integrations/integrations/", {
        params
      })
      return response.data
    }
  })
}
