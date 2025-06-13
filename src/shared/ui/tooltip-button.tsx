import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip.tsx"
import type { TooltipContentProps } from "@radix-ui/react-tooltip"
import type React from "react"

interface TooltipButtonProps {
  icon: React.ReactNode
  tooltipText: string
  disabled?: boolean
  onClick?: () => void
  buttonClassName?: string
  contentProps?: TooltipContentProps
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ icon, contentProps, tooltipText, disabled, onClick, buttonClassName }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-8 bg-secondary hover:bg-zinc-200 active:bg-zinc-300", buttonClassName)}
          disabled={disabled}
          onClick={onClick}
        >
          {icon}
          <span className="sr-only">{tooltipText}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent {...contentProps}>{tooltipText}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipButton
