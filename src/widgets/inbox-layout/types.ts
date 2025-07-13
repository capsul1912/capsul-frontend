import type { ListItemButtonProps } from "@mui/material/ListItemButton"
import type { ReactNode } from "react"

export type IMainFilterType = "MY_INBOX" | "ALL" | "UNASSIGNED" | "MENTIONS" | "AGENT"

export interface IMainFilter {
  title: string
  icon: ReactNode
  type: IMainFilterType
}

export type ItemProp = {
  text: string
  icon: React.ReactNode
  filterType?: IMainFilterType
  MuiListItemButton?: ListItemButtonProps & { href?: string }
}
