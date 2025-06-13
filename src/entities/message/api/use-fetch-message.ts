import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useQuery } from "@tanstack/react-query"
import type { IMessage } from "../types"
import { messagesKeys } from "./use-fetch-messages"

export const useFetchMessage = (id: string) => {
  return useQuery({
    queryKey: messagesKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<IMessage>(`/inbox/messages/${id}/`)
      return response.data
    },
    enabled: !!id
  })
}
