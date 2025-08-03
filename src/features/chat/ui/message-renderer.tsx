import { useFetchMessages } from "@/entities/message/api/use-fetch-messages"
import type { IMessage, IMessageSender } from "@/entities/message/types.ts"
import { fakeCurrentSession } from "@/features/chat/fake/fake-data.ts"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { ChatAutoScroll } from "@/features/chat/ui/chat-autoscroll.tsx"
import { MessageBubble } from "@/features/message-bubbles"
import { getUserFromLS } from "@/shared/lib/helpers"
import { colors } from "@/shared/theme"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { darken, lighten } from "@mui/material/styles"
import { format, isToday, isYesterday } from "date-fns"
import React from "react"
import { type JSX, memo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const currentSession = fakeCurrentSession

export const MessageRenderer = memo(() => {
  // Helpers
  const [searchParams] = useSearchParams()

  // Store
  const { goToMessage, addToReferences, setMessages, messages } = useChatStore()

  const messagesSorted = React.useMemo(
    () =>
      messages
        .map(message => Object.assign(message, { dateParsed: new Date(message.created_at) }))
        .filter(message => !Number.isNaN(message.dateParsed.getTime()))
        .sort((a, b) => a.dateParsed.getTime() - b.dateParsed.getTime())
        .reduce(
          (acc, message) => {
            if (acc.length === 0) {
              return acc.concat([[message]])
            }

            const last = acc[acc.length - 1]
            if (last[0] && format(last[0].dateParsed, "dd.MM.yyyy") === format(message.dateParsed, "dd.MM.yyyy")) {
              last.push(message)
            } else {
              acc.push([message])
            }
            return acc
          },
          [] as (IMessage & { dateParsed: Date })[][]
        ),
    [messages]
  )

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

  console.log(currentSession, getUserFromLS(), isAssigned)

  const handleReply = (m: IMessage) => {
    console.log(m)
  }

  const renderMessage = (message: IMessage) => {
    const renderers: Record<IMessageSender, JSX.Element> = {
      CLIENT: (
        <MessageBubble
          sender="CLIENT"
          key={message.id}
          timestamp={message.created_at}
          isAssigned={isAssigned}
          goToMessage={goToMessage}
          message={message}
          handleReply={handleReply}
          // ref={el => addToReferences(el, message)}
          // typing={messageObj.loading}
          // message={messageObj.message}
        />
      ),
      AGENT: (
        <MessageBubble
          sender="AGENT"
          key={message.id}
          timestamp={message.created_at}
          // typing={messageObj.loading}
          message={message}
        />
      ),
      OPERATOR: (
        <MessageBubble
          sender="OPERATOR"
          key={message.id}
          timestamp={message.created_at}
          goToMessage={goToMessage}
          ref={el => addToReferences(el, message)}
          // messages={fetchedMessages}
          message={message}
        />
      )
    }

    return renderers[message.role] || null
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-3 overflow-auto p-4">
      {messagesSorted.map((messages, index) => (
        <Stack key={index} gap={1} mt={2} sx={{ position: "relative" }}>
          <Box
            sx={[
              {
                position: "sticky",
                top: 0,
                mx: "auto",
                fontSize: 12,
                py: 0.2,
                px: 1,
                borderRadius: 2,
                color: colors.primary[800],
                zIndex: 69,
                backgroundColor: lighten(colors.primary[50], 0.8)
              },
              theme =>
                theme.applyStyles("dark", {
                  backgroundColor: darken(colors.primary[900], 0.35),
                  color: colors.primary[50]
                })
            ]}
          >
            {isToday(messages[0].dateParsed)
              ? "Today"
              : isYesterday(messages[0].dateParsed)
                ? "Yesterday"
                : format(messages[0].dateParsed, "dd.MM.yyyy")}
          </Box>
          {messages?.map(renderMessage)}
        </Stack>
      ))}
      <ChatAutoScroll />
    </div>
  )
})
