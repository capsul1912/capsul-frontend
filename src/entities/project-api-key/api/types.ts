export interface ProjectAPIKey {
  id: string
  name: string
  project: string
  project_name: string
  key: string
  active: boolean
  expires_at: string | null
  request_count: number
  created_at: string
  updated_at: string
}

export interface ProjectAPIKeyCreate {
  name: string
  project: string
  active: boolean
  expires_at?: string
}

export interface ProjectAPIKeyListResponse {
  count: number
  next: string | null
  previous: string | null
  results: ProjectAPIKey[]
}
