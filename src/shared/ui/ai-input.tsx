import { AudioRecorderForCopilot } from "@/features/audio-recorder/ui/for-copilot/audio-recorder-for-copilot.tsx"
import { useAutoResizeTextarea } from "@/shared/lib/hooks/use-auto-resize-textarea"
import { cn } from "@/shared/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Textarea } from "@/shared/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip"
import { CornerRightUp } from "lucide-react"
import { useState } from "react"

interface AIInputProps {
  id?: string
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  onSubmit?: (value: string) => void
  className?: string
  variant?: "chat" | "copilot"
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  className,
  variant = "copilot"
}: AIInputProps) {
  console.log(placeholder)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight
  })
  const [inputValue, setInputValue] = useState("")
  const [activeTab, setActiveTab] = useState("reply")

  const handleReset = () => {
    if (!inputValue.trim()) return
    onSubmit?.(inputValue)
    setInputValue("")
    adjustHeight(true)
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative mx-auto w-full max-w-xl">
        {variant === "chat" && (
          <div className="absolute top-3 left-3 z-10">
            <Tabs defaultValue="reply" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-200">
                {/* Reply Tab with Tooltip */}
                <TabsTrigger value="reply" className="text-zinc-600 dark:text-zinc-200">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>Reply</div>
                    </TooltipTrigger>
                    <TooltipContent className="mb-3 rounded-md bg-white p-3 text-black text-sm shadow-lg dark:bg-zinc-800 dark:text-zinc-50">
                      The message will be sent as a chat message with an email fallback.
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>

                {/* Note Tab with Tooltip */}
                <TabsTrigger value="note" className="text-zinc-600 dark:text-zinc-200">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>Note</div>
                    </TooltipTrigger>
                    <TooltipContent className="mb-3 rounded-md bg-white p-3 text-black text-sm shadow-lg dark:bg-zinc-800 dark:text-zinc-50">
                      Notes will be sent to the team only.
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <Textarea
          id={id}
          placeholder={activeTab === "reply" ? "Ask Chai a question..." : "Add note..."}
          className={cn(
            "max-w-xl rounded-3xl bg-zinc/5 pr-16 pl-8 dark:bg-white/5",
            "placeholder:text-black/50 dark:placeholder:text-white/50",
            "border-none ring-black/20 dark:ring-white/20",
            "text-wrap text-black dark:text-white",
            "resize-none overflow-y-auto",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "transition-[height] duration-100 ease-out",
            variant === "chat" ? ["py-0", "min-h-[140px]", "flex items-center", "pt-14"] : ["py-[16px]", `min-h-[${minHeight}px]`],
            `max-h-[${maxHeight}px]`,
            "[&::-webkit-resizer]:hidden",
            "shadow-[0_-2px_10px_rgba(0,0,0,0.05)]",
            "dark:shadow-[0_-2px_10px_rgba(255,255,255,0.05)]"
          )}
          style={variant === "chat" ? { lineHeight: "140px" } : undefined}
          ref={textareaRef}
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
            adjustHeight()
          }}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleReset()
            }
          }}
        />

        <div
          className={cn(
            "absolute rounded-xl px-1.5 py-1.5 transition-all duration-200 dark:bg-white/5",
            variant === "chat" ? "right-[95px] bottom-4" : "-translate-y-1/2 top-1/2 right-3",
            inputValue && variant === "copilot" && "right-10"
          )}
        >
          <AudioRecorderForCopilot />
        </div>
        {variant === "chat" ? (
          <button
            onClick={handleReset}
            type="button"
            className={cn(
              "absolute right-4 bottom-4 rounded-xl px-5 py-1.5",
              "bg-[#000000] font-medium text-sm text-white",
              !inputValue && "cursor-not-allowed"
            )}
            disabled={!inputValue}
          >
            Send
          </button>
        ) : (
          <button
            onClick={handleReset}
            type="button"
            className={cn(
              "absolute rounded-xl bg-black/5 px-1 py-1 dark:bg-white/5",
              "transition-all duration-200",
              "-translate-y-1/2 top-1/2 right-3",
              inputValue ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            )}
          >
            <CornerRightUp className="h-4 w-4 text-black/70 dark:text-white/70" />
          </button>
        )}
      </div>
    </div>
  )
}
