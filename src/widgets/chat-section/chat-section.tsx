import type { IMessageSender, IMessageType } from "@/entities/message/types.ts"
import { useUpdateTicket } from "@/entities/ticket/api/use-update-tickets"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import ChatHeader from "@/features/chat/ui/chat-header.tsx"
import { EmptyChatMessage } from "@/features/chat/ui/empty-chat-message.tsx"
import MessageInput from "@/features/chat/ui/message-input.tsx"
import { MessageRenderer } from "@/features/chat/ui/message-renderer.tsx"
import { BlurredLoading } from "@/features/loadings"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Button } from "@/shared/ui/button.tsx"
import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from "react-use-websocket"

// types.ts
export interface IChatMessage {
  id: string
  content: string
  role: IMessageSender
  type: IMessageType
  author_id: string | null
  client_id: string
  conversation_id: string
  created_at: string
  event: string
}

export function ChatSection() {
  // Store
  const { projectId } = useParams()
  const { currentTicket, chatLoading, isFetching, setMessages, messages } = useChatStore()
  const { user } = useAuthStore()
  console.log("Current ticket:", currentTicket?.assignee)

  // WebSocket
  const socketUrl = useMemo(() => {
    if (!currentTicket) return null
    return `wss://agent.usechai.com/ws/ws/${projectId}/${currentTicket.id}`
  }, [currentTicket])

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<IChatMessage>(
    socketUrl ?? "",
    {
      shouldReconnect: () => true,
      share: false,
      retryOnError: true,
      onOpen: () => console.log("WebSocket opened"),
      onClose: () => console.log("WebSocket closed"),
      onError: event => console.error("WebSocket error", event)
    },
    !!socketUrl
  )

  // Handle incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      setMessages([
        ...messages,
        {
          id: lastJsonMessage.id,
          content: lastJsonMessage.content,
          role: lastJsonMessage.role,
          type: lastJsonMessage.type,
          author: null,
          mentioned_users: [],
          created_at: lastJsonMessage.created_at,
          conversation: lastJsonMessage.conversation_id,
          audio_file: null,
          audio_transcript: null
        }
      ])
      console.log("Received message:", lastJsonMessage)
      // Optionally update store here
    }
  }, [lastJsonMessage])

  // Ticket update mutation
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicket()

  // Example function to send a message
  const sendMessage = (msg: Partial<IChatMessage>) => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage(msg)
    } else {
      console.warn("WebSocket is not open")
    }
  }

  // Handle assign button click
  const handleAssignTicket = () => {
    if (currentTicket?.id && user?.id) {
      interface UpdateTicketData {
        id: string
        data: { assignee: string }
      }

      interface UpdateTicketOptions {
        onSuccess: () => void
        onError: (err: unknown) => void
      }

      updateTicket(
        {
          id: currentTicket.id,
          data: { assignee: user.id }
        } as UpdateTicketData,
        {
          onSuccess: () => {
            console.log("Ticket assigned successfully")
          },
          onError: (err: unknown) => {
            console.error("Failed to assign ticket:", err)
          }
        } as UpdateTicketOptions
      )
    }
  }

  return (
    <div className="relative flex h-full flex-grow flex-col items-center bg-background">
      <ChatHeader />
      {currentTicket ? (
        <>
          <MessageRenderer />
          {currentTicket.assignee === null ? (
            <Button onClick={handleAssignTicket} disabled={isUpdating} className="m-4 bg-blue-500 text-white">
              {isUpdating ? "Assigning..." : "Assign"}
            </Button>
          ) : currentTicket.assignee === user?.id ? (
            <MessageInput onSend={sendMessage} />
          ) : null}
        </>
      ) : (
        <EmptyChatMessage />
      )}
      <BlurredLoading
        className="backdrop-blur-[5px]"
        spinnerProps={{ className: "size-16 -mt-16" }}
        visible={chatLoading || isFetching || isUpdating}
      />
    </div>
  )
}
