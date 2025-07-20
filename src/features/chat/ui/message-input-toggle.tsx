import { useChatStore } from "@/features/chat/model/chat.store.ts"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export function MessageInputToggle() {
  const { messageMode, setMessageMode } = useChatStore()

  return (
    <ToggleButtonGroup
      size="small"
      sx={{ mb: 1 }}
      value={messageMode}
      onChange={(_, v) => setMessageMode(v)}
      exclusive={true}
      aria-label="Small sizes"
    >
      <ToggleButton value="reply" key="reply">
        Reply
        {/* The message will be sent as a chat message with email fallback. */}
      </ToggleButton>
      <ToggleButton value="note" key="note">
        Note
        {/* Notes will be sent to the team only. */}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
