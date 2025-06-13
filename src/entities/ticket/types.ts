export type ITicketStatus = "OPEN" | "CLOSED"
export type ITicketPriority = "LOW" | "MEDIUM" | "HIGH"

export type ILastMessage = {
  id: string
  content: string
  role: "system"
  type: "MESSAGE"
  created_at: string
  author: string | null
  author_name: string | null
}

export interface ITicket {
  id: string
  created_at: string
  updated_at: string
  status: ITicketStatus
  priority: ITicketPriority
  session: string
  assignee: string
  team: number
  session_name: string
  session_email: string
  last_message: ILastMessage
}
