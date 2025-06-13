import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { api } from "@/shared/lib/api/axios-interceptors.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IMessage, IMessageListResponse } from "../types"
import { messagesKeys } from "./use-fetch-messages"

type ISendMessageType = "MESSAGE" | "NOTE" | "AUDIO"

interface IMessageBody {
  content: string
  type: ISendMessageType
  author?: string | null
  mentioned_users?: string[]
  conversation: string
}

const sendMessageMutation = async (body: IMessageBody) => {
  const { data } = await api.post("/inbox/message-create/", body)
  return data as IMessage
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sendMessageMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesKeys.lists() })
    },
    onError: error => {
      console.error("Error posting message:", error)
    }
  })
}

export const useMessageOptimisticUpdate = () => {
  const queryClient = useQueryClient()
  const { currentTicket } = useChatStore()

  return (newMessage: Partial<IMessage>) => {
    console.log("currentTicket?.id")
    console.log(currentTicket?.id)

    return queryClient.setQueryData(messagesKeys.list({ conversation: currentTicket?.id }), (oldData: IMessageListResponse | undefined) => {
      // If cache is not found, initialize it with the new message
      if (!oldData) {
        return {
          results: [newMessage],
          count: 1,
          next: null,
          previous: null
        }
      }
      console.log(oldData)
      console.log({
        ...oldData,
        results: [newMessage, ...oldData.results]
      })
      return {
        ...oldData,
        count: oldData.count + 1,
        results: [newMessage, ...oldData.results]
      }
    })
  }
}
