import { fakeCurrentSession } from "@/features/chat/fake/fake-data.ts"
import { HideEyeIcon, InboxIcon } from "@/shared/icons"
import TooltipButton from "@/shared/ui/tooltip-button"
import { EllipsisIcon } from "lucide-react"

function ChatHeader() {
  const currentSession = fakeCurrentSession

  return (
    <div className="flex w-full items-center justify-between border-border/40 border-b p-4">
      <p className="text-sm" />
      <div className="flex items-center gap-2">
        <TooltipButton
          icon={<InboxIcon className="h-4 w-4 *:fill-white" />}
          tooltipText="Snooze ticket"
          disabled={!currentSession}
          buttonClassName="bg-primary hover:bg-primary active:bg-zinc-600"
        />
        <TooltipButton icon={<HideEyeIcon className="h-4 w-4" />} tooltipText="Set as unread" disabled={!currentSession} />
        <TooltipButton icon={<EllipsisIcon className="h-4 w-4" />} tooltipText="Set as unread" disabled={!currentSession} />
        {/*<Separator orientation="vertical" className="mx-2 h-6" />*/}
        {/*<ReopenButton />*/}
      </div>
    </div>
  )
}

export default ChatHeader
