import type { IMessage } from "@/entities/message/types.ts"
import type { IOption } from "@/shared/ui/inputs"

// Language options
export const languageOptions: IOption[] = [
  {
    title: "English",
    value: "en"
  },
  {
    title: "Русский",
    value: "ru"
  },
  {
    title: "O‘zbekcha",
    value: "uz"
  }
] as const

export const bgMessagesEffect: IMessage[] = [
  {
    content: "Ibn sino kim bo'lgan",
    created_at: "",
    role: "CLIENT",
    id: "",
    author: null,
    mentioned_users: [],
    type: "MESSAGE",
    conversation: "",
    audio_file: null,
    audio_transcript: null
  }
]
