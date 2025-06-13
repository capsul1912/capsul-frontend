import { TelegramBadgeIcon, WhatsupBadgeIcon } from "@/shared/icons"
import { cn } from "@/shared/lib/utils"
import type { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  type: "telegram" | "whatsapp"
}

export function ChatFromType({ type, ...props }: IProps) {
  return (
    <div
      {...props}
      className={cn("absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full bg-white pt-[1px] pl-[.5px]", props.className)}
    >
      {type === "telegram" ? <TelegramBadgeIcon /> : <WhatsupBadgeIcon />}
    </div>
  )
}
