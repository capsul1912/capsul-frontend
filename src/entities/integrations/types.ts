export type IntegrationType = "telegram" | "whatsapp"

export interface IIntegrationsParams {
  project_id?: string
  limit?: number
  offset?: number
}
interface IntegrationList {
  id: string | number
  integration_type: IntegrationType
  project: string
  is_active: boolean
  created_at: string
  updated_at: string
}
export interface IIntegrationsResponse {
  count: number
  next?: string | null
  previous?: string | null
  results: IntegrationList[]
}
