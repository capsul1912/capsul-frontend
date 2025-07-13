import Badge, { badgeClasses } from "@mui/material/Badge"
import IconButton, { type IconButtonProps } from "@mui/material/IconButton"
import type React from "react"

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean
}

export const MenuButton: React.FC<MenuButtonProps> = ({ showBadge = false, ...props }) => {
  return (
    <Badge color="error" variant="dot" invisible={!showBadge} sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}>
      <IconButton size="small" {...props} />
    </Badge>
  )
}
