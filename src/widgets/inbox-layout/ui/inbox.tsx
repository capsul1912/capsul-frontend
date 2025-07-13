import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import type React from "react"
import type { ItemProp } from "../types"
import { InboxListWrapper, InboxMain, InboxTypography } from "./inbox-components"

export const InboxSidebar: React.FC<{ open?: boolean; items: ItemProp[] }> = ({ open = true, items }) => {
  return (
    <InboxMain open={open}>
      <Box>
        <InboxTypography>Inbox</InboxTypography>
        <InboxListWrapper>
          <List dense>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton {...item.MuiListItemButton}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </InboxListWrapper>
      </Box>
    </InboxMain>
  )
}
