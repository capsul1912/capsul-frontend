import type { IPostAccountBody } from "@/features/account/models/api-types.ts"
import type { ISocketResponse, IUserMessage } from "@/features/chat/lib/types.ts"
import type { IChatLog } from "@/features/project/model"

export function isUserMessage(response: ISocketResponse): response is IUserMessage {
  return ["message", "reply_to"].every(field => field in response)
}

export function makeChatLog(properties: Partial<IChatLog>): IChatLog {
  return {
    timestamp: "",
    output_tokens: 0,
    sender_type: "USER",
    input_tokens: 0,
    response_time: "",
    source: "",
    model: "",
    cost: "",
    session: "",
    id: "",
    message: "",
    ...properties
  }
}

export function createFormData(data: IPostAccountBody): FormData {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value)
    }
  })
  return formData
}
