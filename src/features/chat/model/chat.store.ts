import type { IMessage } from "@/entities/message/types.ts"
import type { ITicket } from "@/entities/ticket/types"
import type { IChatLog } from "@/features/project/model"
import { create } from "zustand"

export type IChatInputMode = "reply" | "note"

interface ChatState {
  // Chat Session
  currentTicket: ITicket | null
  setCurrentTicket: (ticket: ITicket | null) => void

  // Chat Messages
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
  isFetching: boolean
  chatLoading: boolean
  setChatLoading: (l: boolean) => void

  // Replying to State
  replyingMessage: IChatLog | null
  reply: (message: IChatLog) => void
  clearReply: () => void

  // Message Input
  inputValue: string
  setInputValue: (value: string) => void

  // Message Mode (Reply or Note)
  messageMode: IChatInputMode
  setMessageMode: (mode: IChatInputMode) => void

  // Send Message
  // sendMessage: () => void;

  // Message Refs
  bottomRef: HTMLDivElement | null
  setBottomRef: (ref: HTMLDivElement | null) => void
  messageRefs: Record<string, HTMLDivElement>
  addToReferences: (el: HTMLDivElement | null, messageObj: IMessage) => void
  goToMessage: (id: IMessage["id"]) => void
  scrollToBottom: () => void

  // Audio Recorder State
  isOpenRecorder: boolean
  audioUrl: string | null
  openRecorder: () => void
  closeRecorder: () => void
  setAudioUrl: (url: string) => void
}

export const useChatStore = create<ChatState>((set, get) => {
  const messageRefs: Record<string, HTMLDivElement> = {}
  return {
    // Chat Session
    currentTicket: null,
    setCurrentTicket: currentTicket => set({ currentTicket }),

    // Chat Messages
    messages: [],
    setMessages: messages => set({ messages }),
    isFetching: false,
    chatLoading: false,
    setChatLoading: chatLoading => set({ chatLoading }),

    // Replying State
    replyingMessage: null,
    reply: message => set({ replyingMessage: message }),
    clearReply: () => set({ replyingMessage: null }),

    // Message Input
    inputValue: "",
    setInputValue: value => set({ inputValue: value }),

    // Toggle between "Reply" & "Note"
    messageMode: "reply",
    setMessageMode: mode => set({ messageMode: mode }),

    // Send Message (Fix inputValue issue)
    // sendMessage: () => {
    //     const { inputValue, messages } = get();
    //     if (!inputValue.trim()) return; // Prevent sending empty messages
    //
    //     const newMessage: IMessage = {
    //         id: `${Date.now()}`,
    //         source: 'user-input',
    //         message: inputValue,
    //         reply: undefined,
    //         need_operator: false,
    //         timestamp: new Date().toISOString(),
    //         sender_type: 'USER',
    //         input_tokens: 0,
    //         output_tokens: 0,
    //         cost: '0.00',
    //         response_time: '0s',
    //         model: 'default-model',
    //         session: fakeCurrentSession.session_id,
    //         loading: false,
    //     };
    //
    //     set({ messages: [...messages, newMessage], inputValue: '' });
    // },

    // Message Refs
    bottomRef: null,
    setBottomRef: ref => set({ bottomRef: ref }),

    messageRefs,
    addToReferences: (el, messageObj) => {
      if (el) messageRefs[messageObj.id] = el
    },

    goToMessage: chatLogId => {
      const targetMessage = messageRefs[chatLogId]
      if (targetMessage) {
        targetMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })
        targetMessage.style.backgroundColor = "#E2E8F0"
        targetMessage.style.transition = "1s"
        setTimeout(() => {
          targetMessage.style.backgroundColor = "transparent"
        }, 2000)
      }
    },

    // Fix `scrollToBottom` to check for `bottomRef`
    scrollToBottom: () => {
      const { bottomRef } = get()
      if (bottomRef) {
        bottomRef.scrollIntoView({ behavior: "smooth" })
      }
    },

    // Audio Recorder
    isOpenRecorder: false,
    audioUrl: null,
    openRecorder: () => set({ isOpenRecorder: true }),
    closeRecorder: () => set({ isOpenRecorder: false, audioUrl: null }),
    setAudioUrl: url => set({ audioUrl: url })
  }
})
