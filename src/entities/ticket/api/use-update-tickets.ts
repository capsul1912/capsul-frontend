import type { ITicket } from "@/entities/ticket/types.ts"
import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ticketsKeys } from "./use-fetch-tickets.ts"

// Define the type for the update payload
export type IUpdateTicketPayload = Partial<ITicket>

// Hook for updating a ticket
export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string
      data: IUpdateTicketPayload
    }) => {
      const response = await api.put<ITicket>(`/inbox/tickets/${id}/`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all })
    },
    onError: error => {
      console.error("Error updating ticket:", error)
    }
  })
}
