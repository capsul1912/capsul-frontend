import type { ITicket } from "@/entities/ticket/types.ts"
import { useChatStore } from "@/features/chat/model/chat.store"
import { colors } from "@/shared/theme"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar.tsx"
import { Checkbox } from "@/shared/ui/checkbox.tsx"
import Identicon from "@/shared/ui/identicon.tsx"
import ListItemButton from "@mui/material/ListItemButton"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { darken } from "@mui/material/styles"
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
    <ListItemButton
      component={Paper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={[
        theme => ({
          height: "auto",
          borderRadius: 2,
          // boxShadow: "",
          padding: theme.spacing(1),
          backgroundColor: isActive ? colors.common.white : "transparent",
          borderColor: isActive ? undefined : "transparent",
          boxShadow: isActive || isHover ? undefined : "0",
          cursor: "pointer"
        }),
        theme =>
          theme.applyStyles("dark", {
            backgroundColor: isActive ? darken(colors.primary[600], 0.5) : "transparent"
          })
      ]}
      onClick={() => {
        setCurrentTicket(chat)
        navigate(`?ticketId=${chat.id}`, { replace: true })
      }}
    >
      <Stack gap={1} width="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" gap={1}>
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
            <Typography>{chat.session_name || chat.session_email}</Typography>
          </Stack>
          <Typography fontSize={12}>
            {formatDistanceToNow(new Date(chat.updated_at), {
              addSuffix: true
            })}
          </Typography>
        </Stack>
        <Typography fontSize={14} noWrap>
          {chat.last_message?.content}
        </Typography>
      </Stack>
    </ListItemButton>
  )
}
