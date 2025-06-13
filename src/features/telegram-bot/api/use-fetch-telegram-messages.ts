import type { ITicketPriority, ITicketStatus } from "@/entities/ticket/types"
import { api } from "@/shared/lib/api/axios-interceptors"
import type { IPageable } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { telegramBotKeys } from "./use-post-telegram-integration"

export interface IPaginationParams {
  offset?: number
  limit?: number
}

interface IParams extends IPaginationParams {
  integration_type: "telegram"
  integration_id: number
}

export interface ITimestamps {
  created_at: string
  udated_at: string
}

interface ITelegramMessage extends ITimestamps {
  id: string
  session: string
  status: ITicketStatus
  priority: ITicketPriority
  assignee: string
  team: number
  session_name: string
  session_email: string
  last_message: string
}

export async function fetchTelegramMessages(params?: IParams) {
  const response = await api.get<IPageable<ITelegramMessage>>("/integrations/telegram-integrations/", {
    params
  })
  return response.data
}

export const useFetchTelegramMessages = (params?: IParams) => {
  return useQuery({
    queryKey: telegramBotKeys.list(JSON.stringify(params)),
    queryFn: () => fetchTelegramMessages(params)
  })
}
