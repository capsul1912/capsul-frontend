import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { memo, useEffect, useRef } from "react"

const ChatAutoScroll = memo(() => {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const { setBottomRef, scrollToBottom, messages } = useChatStore()

  useEffect(() => {
    if (bottomRef.current) setBottomRef(bottomRef.current)
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  return <div ref={bottomRef} />
})
export { ChatAutoScroll }
