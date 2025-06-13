import type { IMessage } from "@/entities/message/types.ts"
import TypingEffect from "@/features/typing-effect"
import { cn } from "@/shared/lib/helpers"
import { Button } from "@/shared/ui/button.tsx"
import dayjs from "dayjs"
import { Reply, User2Icon } from "lucide-react"
import { forwardRef, useState } from "react"
import ReactMarkdown from "react-markdown"

export interface IChatResult {
  content: string
  conversation_id: string
  finished: boolean
  source: "Cache" | "Fallback"
}

interface IProps {
  timestamp?: string
  message?: IMessage
  typing?: boolean
  isAssigned?: boolean
  lastJsonMessage?: IChatResult
  goToMessage?: (chatLogId: string) => void
  handleReply?: (messageObj: IMessage) => void
}

const UserMessageBox = forwardRef<HTMLDivElement, IProps>(({ message, typing, handleReply, timestamp, isAssigned = false }: IProps, ref) => {
  // Helper Hooks
  // const { currentSession } = useChat();

  // Queries
  // const { data: fetchedIssued } = useFetchIssuesQuery(
  //     {
  //         session__session_id: currentSession?.session_id,
  //     },
  //     { skip: !currentSession?.session_id }
  // );
  // States
  const [temp] = useState("")

  // Functions
  // const foundIssue = fetchedIssued?.find(
  //     issue => issue.chatlog?.id === messageObj?.id
  // );
  // const isResolved = foundIssue
  //     ? foundIssue?.resolved_by !== null
  //     : false;

  return (
    <div ref={ref} className="group relative flex gap-2 px-4 text-sm">
      <div className="flex max-w-[77%] gap-2 ">
        {/*<div className="flex flex-shrink-0 items-center overflow-hidden rounded-full border border-solid border-gray-200 bg-white p-1">*/}
        <User2Icon className="mx-auto size-8 rounded-full border bg-white p-1.5" />
        {/*<Identicon value={message?.id || ''} size={80} className="size-8 border rounded-full" />*/}
        {/*<img src={avatarImage} alt="" className="size-8" />*/}
        {/*</div>*/}
        <div className="relative rounded-2xl rounded-tl-none bg-bg-light p-5 pb-7 text-[#14151A]">
          {typing ? temp ? <ReactMarkdown>{temp}</ReactMarkdown> : <TypingEffect /> : <ReactMarkdown>{message?.content}</ReactMarkdown>}
          {/*{messageObj?.need_operator ? (*/}
          {/*    <Badge*/}
          {/*        variant="secondary"*/}
          {/*        className={cn(*/}
          {/*            `absolute right-2 top-2 size-3 rounded-full bg-red-500 p-0`,*/}
          {/*            isResolved ? 'bg-green-400' : ''*/}
          {/*        )}*/}
          {/*    />*/}
          {/*) : (*/}
          {/*    ''*/}
          {/*)}*/}
          <span className="absolute right-2 bottom-1 text-gray-300 text-xs">{timestamp ? dayjs(timestamp).format("HH:mm") : ""}</span>
        </div>
      </div>
      <div className="flex w-[120px] items-center">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            if (message) handleReply?.(message)
          }}
          className={cn("border-0 bg-gray-100 px-2 hover:bg-gray-200 active:bg-gray-300", isAssigned ? "group-hover:flex" : "hidden")}
        >
          <Reply className="size-5" />
        </Button>
      </div>
    </div>
  )
})

export default UserMessageBox
