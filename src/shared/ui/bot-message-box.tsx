import TypingEffect from "@/features/typing-effect"
import dayjs from "dayjs"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { DoubleCheckIcon, Logo } from "../icons"

export interface IChatResult {
  content: string
  conversation_id: string
  finished: boolean
  source: "Cache" | "Fallback"
}

interface IProps {
  message?: string
  timestamp: string
  typing?: boolean
  lastJsonMessage?: IChatResult
}

function BotMessageBox({ message, typing, timestamp }: IProps) {
  // States
  const [temp] = useState<string>("")

  return (
    <div className="ml-auto flex max-w-[85%] items-end gap-2 self-start text-sm">
      <div className="relative min-w-[70px] rounded-2xl rounded-br-none bg-[#F3EAFD] p-4 pb-7">
        {typing ? temp ? <ReactMarkdown>{temp}</ReactMarkdown> : <TypingEffect /> : <ReactMarkdown>{message}</ReactMarkdown>}
        <span className="absolute right-2 bottom-1 flex items-center gap-1 text-gray-500 text-xs">
          <DoubleCheckIcon className={typing ? "hidden" : ""} />
          {dayjs(timestamp).format("HH:mm")}
        </span>
      </div>
      <div className="flex size-[38px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-gray-200 bg-white">
        <Logo className="size-8 rounded-full" />
      </div>
    </div>
  )
}

export default BotMessageBox
