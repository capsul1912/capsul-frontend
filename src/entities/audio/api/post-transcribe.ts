import type { ITranscriptObject } from "@/entities/audio/types.ts"
import { api } from "@/shared/lib/api/axios-interceptors.ts"

export async function postTranscribe(audioBlob: Blob) {
  const formData = new FormData()
  formData.append("audio", audioBlob, "audio.webm")

  const { data } = await api.post("https://agent.usechai.com/chat/inbox/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  return data as ITranscriptObject
}

// {
//     "success": true,
//     "transcript": "Здравствуйте. Меня зовут Мухаммад Али.\n",
//     "error": null,
//     "file_info": {
//     "filename": "audio.webm",
//         "size": 28862,
//         "mime_type": "video/webm",
//         "duration": null,
//         "url": "/media/transcriptions/1748281900_audio.m4a",
//         "user_id": "7a09c89d-5ff6-48a0-a3bb-3227ed472970",
//         "organization_id": null,
//         "converted": true
// }
// }
