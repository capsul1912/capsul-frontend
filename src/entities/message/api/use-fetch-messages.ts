import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useQuery } from "@tanstack/react-query"
import type { IMessageListResponse } from "../types"

export type IMessagesParams = {
  conversation?: string
  search?: string
  ordering?: "-created_at" | "created_at"
}

export const messagesKeys = {
  all: ["messages"] as const,
  lists: () => [...messagesKeys.all, "list"] as const,
  list: (filters?: IMessagesParams) => [...messagesKeys.lists(), { filters }] as const,
  details: () => [...messagesKeys.all, "detail"] as const,
  detail: (id: string) => [...messagesKeys.details(), id] as const
}

export const fetchMessages = async (params?: IMessagesParams) => {
  const { data } = await api.get<IMessageListResponse>("/inbox/messages/", { params })
  return data
}

export const useFetchMessages = (params?: IMessagesParams) => {
  const additionalParams: IMessagesParams = params ? { ordering: "created_at", ...params } : {}
  return useQuery({
    queryKey: messagesKeys.list(additionalParams),
    queryFn: () => fetchMessages(additionalParams)
  })
}
