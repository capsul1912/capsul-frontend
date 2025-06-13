export interface IMessageUser {
  id: string
  email: string
  username: string
  full_name: string
  phone_number?: string | null
  role?: string | null
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login?: string | null
  created_at: string
  updated_at: string
  team?: number | null
  current_organization?: string | null
  groups?: string[]
  user_permissions?: string[]
}

export type IMessageType = "MESSAGE" | "NOTE" | "AUDIO"
export type IMessageSender = "CLIENT" | "OPERATOR" | "AGENT"

export interface IMessage {
  id: string
  content: string
  role: IMessageSender
  type: IMessageType
  author: IMessageUser | null
  mentioned_users: IMessageUser[]
  created_at: string
  conversation: string
  audio_file: string | null
  audio_transcript: string | null
}

export interface IMessageListResponse {
  count: number
  next?: string | null
  previous?: string | null
  results: IMessage[]
}

export interface IMessageCreateUpdate {
  content: string
  type: string
  author?: string | null
  mentioned_users?: string[]
  conversation: string
}
