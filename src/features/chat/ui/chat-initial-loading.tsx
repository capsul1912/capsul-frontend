import { useChat } from "@/app/context/chat-context.tsx"
import { bgMessagesEffect } from "@/shared/constants"
import BotMessageBox from "@/shared/ui/bot-message-box.tsx"
import UserMessageBox from "@/shared/ui/user-message-box.tsx"

const InitialChatMessagesEffect = () => {
  const { isLoading } = useChat()

  if (!isLoading) return null

  return (
    <>
      {bgMessagesEffect.map((message, i) =>
        message.role === "CLIENT" ? (
          <UserMessageBox key={i} message={message} timestamp={message.created_at} />
        ) : (
          <BotMessageBox key={i} message={message.content} timestamp={message.created_at} />
        )
      )}
    </>
  )
}

export default InitialChatMessagesEffect
