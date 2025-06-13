import { type IChatInputMode, useChatStore } from "@/features/chat/model/chat.store.ts"
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip.tsx"

export function MessageInputToggle() {
  const { messageMode, setMessageMode } = useChatStore()

  return (
    <ToggleGroup
      type="single"
      value={messageMode}
      onValueChange={val => val && setMessageMode(val as IChatInputMode)}
      className="mb-2 inline-flex h-9 justify-start self-start rounded-lg bg-zinc-100 p-1"
    >
      <ToggleGroupItem value="reply" className="data-[state=on]:!bg-white z-[999!important] h-7">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>Reply</div>
          </TooltipTrigger>
          <TooltipContent className="z-[999!important]">The message will be sent as a chat message with email fallback.</TooltipContent>
        </Tooltip>
      </ToggleGroupItem>

      <ToggleGroupItem value="note" className="data-[state=on]:!bg-white h-7">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>Note</div>
          </TooltipTrigger>
          <TooltipContent>Notes will be sent to the team only.</TooltipContent>
        </Tooltip>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
