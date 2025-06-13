import type { ITicket } from "@/entities/ticket/types.ts"
import { useChatStore } from "@/features/chat/model/chat.store"
import { CustomEllipsisIcon } from "@/shared/icons"
import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar.tsx"
import { Checkbox } from "@/shared/ui/checkbox.tsx"
import Identicon from "@/shared/ui/identicon.tsx"
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar.tsx"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

interface IProps {
  chat: ITicket
  index: number
}

export function SessionCardItem({ chat }: IProps) {
  // Helpers
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Store
  const { setCurrentTicket } = useChatStore()

  // States
  const [isHover, setHover] = useState(false)
  const [checked, setChecked] = useState(false)

  const isActive = searchParams.get("ticketId") === chat.id

  return (
    <SidebarMenuItem
      className="mt-1 border-[#DEE0E3] border-b hover:rounded-xl"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <SidebarMenuButton
        className={cn(
          "!border[#DEE0E3] group hover:!border-[#B4C7F8] h-auto rounded-xl border border-transparent px-1.5 hover:bg-[#F0F4FE]",
          checked && "border-[#B4C7F8] bg-[#F0F4FE]",
          isActive ? "group bg-[#4778F5] hover:bg-[#4778F5]" : ""
        )}
        onClick={() => {
          setCurrentTicket(chat)
          navigate(`?ticketId=${chat.id}`, { replace: true })
        }}
        asChild
        data-active={isActive ? "active" : "inactive"}
      >
        <button className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-white">
                  {checked || isHover ? (
                    <Checkbox checked={checked} onCheckedChange={() => setChecked(!checked)} className="rounded-[4px] border-[#DEE0E3]" />
                  ) : (
                    //     : index % 4 === 0 ? (
                    //     <img src={avatarImage} alt="" className="size-8" />
                    // )
                    <Identicon value={chat.id} size={80} />
                  )}
                </AvatarFallback>
              </Avatar>
              <p className={`font-semibold text-[#6F6D74] text-sm ${isActive ? "group-data-[active]:text-white" : ""}`}>
                {chat.session_name || chat.session_email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-[#14151A] text-[10px] ${isActive ? "group-data-[active]:text-white" : ""}`}>
                {formatDistanceToNow(new Date(chat.updated_at), {
                  addSuffix: true
                })}
              </div>
              <button>
                <CustomEllipsisIcon className="size-4 group-data-[active]:*:fill-white" />
              </button>
            </div>
          </div>
          <div className={`flex w-full flex-grow items-center truncate text-ellipsis text-[#696D7C] text-xs ${isActive ? "text-white" : ""}`}>
            {/*<MessageCircleMore className="mr-1 size-4 min-w-4" />*/}
            {chat.last_message?.content}
          </div>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
