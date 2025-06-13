import type { IMessage } from "@/entities/message/types.ts"
import dayjs from "dayjs"
import { forwardRef } from "react"
import ReactMarkdown from "react-markdown"

export interface IChatResult {
  content: string
  conversation_id: string
  finished: boolean
  source: "Cache" | "Fallback"
}

interface IProps {
  messages?: IMessage[]
  message: IMessage
  timestamp: string
  typing?: boolean
  lastJsonMessage?: IChatResult
  goToMessage?: (chatLogId: string) => void
}

const OperatorMessage = forwardRef<HTMLDivElement, IProps>(({ message, timestamp }: IProps, ref) => {
  // Functions
  // const repliedMessage = useMemo(() => messages?.find(m => m.id === message.reply), [message.reply, messages])
  //
  // function handleGotoMessage() {
  //   if (message.reply) {
  //     goToMessage?.(message.reply)
  //   }
  // }

  return (
    <div ref={ref} className="max-w[85%] group ml-auto flex gap-2 self-start px-4 text-sm">
      {/*<div className="relative rounded-2xl rounded-br-none bg-[#FCDAC0] p-5">*/}
      <div className="relative rounded-2xl rounded-br-none bg-blue-200 p-5">
        {/*{message.reply ? (*/}
        {/*  <>*/}
        {/*    <Button*/}
        {/*      onClick={handleGotoMessage}*/}
        {/*      className="mb-1 flex rounded-sm border-0 border-gray-500 border-l-[3px] border-solid bg-gray-300 p-2 py-2 font-light text-gray-900 hover:bg-[#c1c5cB] active:bg-[#b1b5bB]"*/}
        {/*    >*/}
        {/*      <ReactMarkdown>{repliedMessage?.message}</ReactMarkdown>*/}
        {/*    </Button>*/}
        {/*    <ReactMarkdown>{messageObj.message}</ReactMarkdown>*/}
        {/*  </>*/}
        {/*) : (*/}
        <ReactMarkdown>{message.content}</ReactMarkdown>
        {/*)}*/}
        <span className="absolute right-2 bottom-1 text-gray-500 text-xs">{dayjs(timestamp).format("HH:mm")}</span>
      </div>
      {/*<div className="mt-auto flex size-[38px] flex-shrink-0 items-center overflow-hidden rounded-full border border-solid border-gray-200 bg-white pl-[4px]">*/}
      {/*<img className="mt-auto size-8" src={avatarImage} alt="" />*/}
      {/*<UserRoundPenIcon className="mx-auto size-5" />*/}
      {/*<SpinnerIcon className=" size-11 relative -left-2 -top-2"/>*/}
      {/*</div>*/}
    </div>
  )
})

export default OperatorMessage
