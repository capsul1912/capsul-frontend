import { useFetchMessages } from "@/entities/message/api/use-fetch-messages"
import type { IMessage, IMessageSender } from "@/entities/message/types.ts"
import { fakeCurrentSession } from "@/features/chat/fake/fake-data.ts"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { ChatAutoScroll } from "@/features/chat/ui/chat-autoscroll.tsx"
import MessageDate from "@/features/chat/ui/message-date.tsx"
import { getUserFromLS } from "@/shared/lib/helpers"
import BotMessageBox from "@/shared/ui/bot-message-box.tsx"
import OperatorMessage from "@/shared/ui/operator-message.tsx"
import UserMessageBox from "@/shared/ui/user-message-box.tsx"
import { type JSX, memo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const currentSession = fakeCurrentSession

export const MessageRenderer = memo(() => {
  // Helpers
  const [searchParams] = useSearchParams()

  // Store
  const { goToMessage, addToReferences, setMessages, messages } = useChatStore()

  // Queries
  const { data } = useFetchMessages({
    conversation: searchParams.get("ticketId") || undefined
  })
  const fetchedMessages = data?.results

  useEffect(() => {
    if (fetchedMessages?.length) {
      setMessages(fetchedMessages)
    }
  }, [fetchedMessages])

  // Functions
  const isAssigned = currentSession?.assigned_to === getUserFromLS()?.id

  const renderMessage = (message: IMessage) => {
    const renderers: Record<IMessageSender, JSX.Element> = {
      CLIENT: (
        <UserMessageBox
          key={message.id}
          timestamp={message.created_at}
          isAssigned={isAssigned}
          goToMessage={goToMessage}
          message={message}
          // handleReply={handleReply}
          // ref={el => addToReferences(el, message)}
          // typing={messageObj.loading}
          // message={messageObj.message}
        />
      ),
      AGENT: (
        <BotMessageBox
          key={message.id}
          timestamp={message.created_at}
          // typing={messageObj.loading}
          message={message.content}
        />
      ),
      OPERATOR: (
        <OperatorMessage
          key={message.id}
          timestamp={message.created_at}
          goToMessage={goToMessage}
          ref={el => addToReferences(el, message)}
          messages={fetchedMessages}
          message={message}
        />
      )
    }

    return renderers[message.role] || null
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-3 overflow-auto p-4">
      <MessageDate date={currentSession.start_time} />
      {messages?.map(renderMessage)}
      <ChatAutoScroll />
    </div>
  )
})
