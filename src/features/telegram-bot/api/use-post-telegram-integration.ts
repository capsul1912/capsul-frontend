import { api } from "@/shared/lib/api/axios-interceptors"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface ITelegramBot {
  // organization: string
  bot_api_token: string
  project: string
  is_active: boolean
}

export const telegramBotKeys = {
  all: ["telegram-bot"] as const,
  lists: () => [...telegramBotKeys.all, "list"] as const,
  list: (filters: string) => [...telegramBotKeys.lists(), { filters }] as const,
  details: () => [...telegramBotKeys.all, "detail"] as const,
  detail: (id: string) => [...telegramBotKeys.details(), id] as const
}
export const usePostTelegramIntegration = () => {
  const QueryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ITelegramBot) => {
      const response = await api.post<ITelegramBot>("/integrations/telegram-integrations/", data)
      return response.data
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: telegramBotKeys.all })
    },
    onError: error => {
      console.error("Error posting telegram bot:", error)
    }
  })
}
