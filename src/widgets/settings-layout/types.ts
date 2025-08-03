import type { ListItemButtonProps } from "@mui/material/ListItemButton"

export type ItemProp = {
  text: string
  icon: React.ReactNode
  MuiListItemButton?: ListItemButtonProps & { href?: string }
}
