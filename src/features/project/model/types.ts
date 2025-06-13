export interface IPaginationParams {
  limit?: string
  offset?: string
}

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

export type ISenderType = "USER" | "AI" | "OPERATOR"

export interface IChatSessionFetchParams {
  project: string
}

export interface IChatLog {
  id: string
  source: string
  message: string
  reply?: string
  need_operator?: boolean
  timestamp: string
  sender_type: ISenderType
  input_tokens: number
  output_tokens: number
  cost: string
  response_time: string
  model: string
  session: string
  loading?: boolean
}

export interface IChatSession {
  end_time: string | null
  id: string
  project: string
  reply_operator: boolean
  session_id: string
  assigned_to: string
  status: ISessionStatus
  start_time: string
  total_cost: string
  total_input_tokens: number
  total_output_tokens: number
}

export type ISessionStatus = "assigned" | "unassigned" | "resolved"

export interface IChatSessionParams extends IPaginationParams {
  project: string
  issue_status?: ISessionStatus
}
