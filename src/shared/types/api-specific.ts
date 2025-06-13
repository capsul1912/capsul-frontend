export interface IPageable<T> {
  count: number
  next: number | null
  previous: number | null
  results: T[]
}

export interface ITheme {
  primaryColor: string
  bgColor: string
  widgetBorderRadius: number
  messagesBorderRadius: number
  buttonsBorderRadius: number
}

export type ISenderType = "USER" | "AI" | "OPERATOR"

export interface ILogMessage {
  cost: string
  id: string
  input_tokens: number
  message: string
  model: string
  output_tokens: number
  response_time: string
  sender_type: ISenderType
  session: string
  source: string
  timestamp: string
}
