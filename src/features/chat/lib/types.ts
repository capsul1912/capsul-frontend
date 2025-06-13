export type ISocketResponse = IUserMessage | IBotLastMessage

export interface IUserMessage {
  message: string
  project_id: string
  session_id: string
  reply_to: string | null
}

export type IBotMessageSource = "Cache" | "Fallback" | "Generated"

export interface IBotMessageExtraHistory {
  content: string
  role: "user" | "assistant"
}

export interface IBotLastMessage {
  content: string
  context: string
  conversation_id: string
  corrected_query: string
  embedding_context: string
  extra: {
    extra: {
      completion_tokens: number
      cost: number
      prompt_tokens: number
      total_tokens: number
    }
    history: IBotMessageExtraHistory[]
  }
  finished: boolean
  need_operator: boolean
  session_id: string
  original_query: boolean
  source: IBotMessageSource
}
