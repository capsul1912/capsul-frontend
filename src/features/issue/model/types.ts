export interface IChatBotKnowledge {
  id: string
  name: string
  user: string
  created_at: string
}

export interface IChatbotProject {
  id: string
  name: string
  description: string
  greeting: string
  temperature: number
  knowladge: IChatBotKnowledge[]
  user: string
  model: string
  annotation_threshold: number
  fall_back_response: string
  instruction: string
}

export type IIssueStatus = "open" | "resolved"

export interface IIssueChatLog {
  id: string
  message: string
  timestamp: string
}

export interface IIssue {
  id: string
  description: string
  reference_count?: number
  created_at: string
  updated_at?: string
  status?: IIssueStatus
  priority?: string
  summary?: string
  session: string
  chatlog?: IIssueChatLog
  assigned_to?: string
  resolved_by?: string
}

export interface IIssueApiParams {
  search?: string
  status?: IIssueStatus
  session__session_id?: string
  session?: string
  limit?: string
  offset?: string
}
