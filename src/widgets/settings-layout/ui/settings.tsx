import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import type React from "react"
import type { ItemProp } from "../types"
import { InboxListWrapper, InboxTypography, SettingsMain } from "./settings-components"

export const SettingsSidebar: React.FC<{ items: ItemProp[] }> = ({ items }) => {
  return (
    <SettingsMain>
      <Box>
        <InboxTypography>Settings</InboxTypography>
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
    </SettingsMain>
  )
}
