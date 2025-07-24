import type { IMessage, IMessageSender } from "@/entities/message/types.ts"
import TypingEffect from "@/features/typing-effect"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import { User2Icon } from "lucide-react"
import { forwardRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { MessageBox } from "./message-components"

export interface IChatResult {
  content: string
  conversation_id: string
  finished: boolean
  source: "Cache" | "Fallback"
}

export interface MessageBubbleProps {
  sender: IMessageSender
  timestamp?: string
  message?: IMessage
  typing?: boolean
  isAssigned?: boolean
  lastJsonMessage?: IChatResult
  goToMessage?: (chatLogId: string) => void
  handleReply?: (messageObj: IMessage) => void
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ sender, message, typing, handleReply, timestamp, isAssigned = false }: MessageBubbleProps, ref) => {
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
      <Stack
        ref={ref}
        direction="row"
        gap={0.5}
        px={1}
        sx={{
          fontSize: "0.875rem",
          lineHeight: "1.25rem"
        }}
        className="group"
      >
        <Stack
          direction={sender === "CLIENT" ? "row" : "row-reverse"}
          alignItems={sender !== "CLIENT" ? "end" : "start"}
          gap={1}
          sx={{
            maxWidth: "90%",
            marginLeft: sender !== "CLIENT" ? "auto" : undefined
          }}
        >
          {sender === "CLIENT" && <User2Icon className="mx-auto size-8 shrink-0 rounded-full border p-1.5" />}
          <MessageBox sender={sender} sx={{ position: "relative", pb: 3, minWidth: "100px" }}>
            {/* <div className="relative rounded-2xl rounded-tl-none bg-bg-light p-5 pb-7 text-[#14151A]"> */}
            {typing ? temp ? <ReactMarkdown>{temp}</ReactMarkdown> : <TypingEffect /> : <ReactMarkdown>{message?.content}</ReactMarkdown>}
            <Typography fontSize={12} color="textDisabled" sx={{ position: "absolute", bottom: 4, right: 8 }}>
              {timestamp ? dayjs(timestamp).format("HH:mm") : ""}
            </Typography>
            {/* </div> */}
          </MessageBox>
          {/* <IconButton */}
          {/*   size="small" */}
          {/*   onClick={() => { */}
          {/*     if (message) handleReply?.(message) */}
          {/*   }} */}
          {/* > */}
          {/*   <Reply className="size-5" /> */}
          {/* </IconButton> */}
        </Stack>
      </Stack>
    )
  }
)
