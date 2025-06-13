import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { messagesKeys } from "./use-fetch-messages"

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/inbox/messages/${id}/`)
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: messagesKeys.all })
      queryClient.invalidateQueries({ queryKey: messagesKeys.detail(id) })
    },
    onError: error => {
      console.error("Error deleting message:", error)
    }
  })
}
