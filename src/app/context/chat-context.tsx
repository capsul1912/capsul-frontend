import fakeChatLogs from "@/features/chat/fake/fake-chatlog.ts"
import { fakeCurrentSession } from "@/features/chat/fake/fake-data.ts"
import { type IChatLog, type IChatSession, useFetchChatLogQuery } from "@/features/project/model"
import type React from "react"
import {
  type Dispatch,
  type MutableRefObject,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"

interface ChatContextType {
  // Current session
  currentSession: IChatSession | null
  setCurrentSession: (value: IChatSession | null) => void
  // Refs
  inputRef: MutableRefObject<HTMLTextAreaElement | null>
  bottomRef: MutableRefObject<HTMLDivElement | null>
  // Messages
  messages: IChatLog[]
  setMessages: Dispatch<SetStateAction<IChatLog[]>>
  isLoading: boolean
  isFetching: boolean
  // Replying message
  replyingMessage: IChatLog | null
  reply: (m: IChatLog) => void
  // Others
  addToReferences: (el: HTMLDivElement | null, messageObj: IChatLog) => void
  goToMessage: (id: IChatLog["id"]) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Refs
  const messageRefs = useRef<Record<string, HTMLDivElement>>({})
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // States
  const [messages, setMessages] = useState<IChatLog[]>(fakeChatLogs || [])
  const [currentSession, setCurrentSessionState] = useState<IChatSession | null>(fakeCurrentSession)
  const [replyingMessage, setReplyingMessage] = useState<IChatLog | null>(null)

  // Queries
  const {
    data: fetchedMessages,
    isLoading,
    isFetching
  } = useFetchChatLogQuery(currentSession?.session_id as string, {
    skip: !currentSession?.session_id
  })

  // Effects
  useEffect(() => {
    if (fetchedMessages) setMessages(fetchedMessages)
    setTimeout(scrollToBottom, 0)
  }, [fetchedMessages])

  // Functions
  function scrollToBottom() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  const setCurrentSession = (value: IChatSession | null) => {
    setCurrentSessionState(value)
  }

  const reply = (message: IChatLog) => {
    setReplyingMessage(message)
    inputRef?.current?.focus()
  }

  function goToMessage(chatLogId: string) {
    const targetMessage = messageRefs.current[chatLogId]

    targetMessage?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })

    targetMessage.style.backgroundColor = "#E2E8F0"
    targetMessage.style.transition = "1s"
    setTimeout(() => {
      targetMessage.style.backgroundColor = "transparent"
    }, 2000)
    setTimeout(() => {
      targetMessage.style.transition = ""
    }, 2400)
  }

  function addToReferences(el: HTMLDivElement | null, messageObj: IChatLog) {
    if (el) {
      messageRefs.current[messageObj.id] = el
    }
  }

  const values = useMemo(() => {
    return {
      goToMessage,
      addToReferences,
      setCurrentSession,
      currentSession,
      bottomRef,
      inputRef,
      replyingMessage,
      reply,
      setMessages,
      messages,
      isFetching,
      isLoading
    }
  }, [currentSession, isFetching, isLoading, messages, replyingMessage])

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useResize must be used within a ResizeProvider")
  }
  return context
}
