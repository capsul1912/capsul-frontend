import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IMessage, IMessageCreateUpdate } from "../types"
import { messagesKeys } from "./use-fetch-messages"

export const usePutMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: IMessageCreateUpdate }) => {
      const response = await api.put<IMessage>(`/inbox/messages/${id}/`, data)
      return response.data
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: messagesKeys.all })
      queryClient.invalidateQueries({ queryKey: messagesKeys.detail(data.id) })
    },
    onError: error => {
      console.error("Error updating message:", error)
    }
  })
}
