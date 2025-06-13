export interface ITranscriptObjectFile {
  filename: string
  size: number
  mime_type: string
  duration: number | null
  url: string
  user_id: string
  organization_id: string | null
  converted: boolean
}

export interface ITranscriptObject {
  success: boolean
  transcript: string
  error: string | null
  file_info: ITranscriptObjectFile
}
