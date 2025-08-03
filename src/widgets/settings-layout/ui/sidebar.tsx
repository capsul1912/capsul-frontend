import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { mergeArray } from "@/shared/lib/utils"
import { SidebarProvider } from "@/shared/ui/sidebar.tsx"
import AddLinkIcon from "@mui/icons-material/AddLink"
import CodeIcon from "@mui/icons-material/Code"
// import DeleteIcon from "@mui/icons-material/Delete"
// import MenuBookIcon from "@mui/icons-material/MenuBook"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
// import SettingsIcon from "@mui/icons-material/Settings"
import StyleIcon from "@mui/icons-material/Style"
import Avatar from "@mui/material/Avatar"
import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import { useLocation } from "react-router-dom"
import type { ItemProp } from "../types"
import { SettingsSidebar } from "./settings"
import { SidebarWrapper } from "./sidebar-components"
import { innerTheme } from "./theme"

export const Sidebar: React.FC = () => {
  // Store
  const { user } = useAuthStore()
  const location = useLocation()

  const inboxItems = React.useMemo(
    () =>
      mergeArray<ItemProp>(
        {
          text: "Profile",
          icon: <Avatar sizes="small" alt={user?.full_name} sx={{ width: 16, height: 16, m: "2px" }} />,
          MuiListItemButton: {
            href: "/settings/profile",
            selected: location.pathname === "/settings/profile"
          }
        },
        {
          text: "Users and teams",
          icon: <PersonAddIcon />,
          MuiListItemButton: {
            href: "/settings/users-and-teams",
            selected: location.pathname === "/settings/users-and-teams"
          }
        },
        {
          text: "Installation",
          icon: <CodeIcon />,
          MuiListItemButton: {
            href: "/settings/installation",
            selected: location.pathname === "/settings/installation"
          }
        },
        {
          text: "Customize",
          icon: <StyleIcon />,
          MuiListItemButton: {
            href: "/settings/customize",
            selected: location.pathname === "/settings/customize"
          }
        },
        {
          text: "Integration",
          icon: <AddLinkIcon />,
          MuiListItemButton: {
            href: "/settings/integration",
            selected: location.pathname === "/settings/integration"
          }
        }
        // {
        //   text: "Knowledge",
        //   icon: <MenuBookIcon />,
        //   MuiListItemButton: {
        //     href: "/settings/knowledge",
        //     selected: location.pathname === "/settings/knowledge"
        //   }
        // },
        // {
        //   text: "Delete bot",
        //   icon: <DeleteIcon />,
        //   MuiListItemButton: {
        //     href: "/settings/delete",
        //     selected: location.pathname === "/settings/delete"
        //   }
        // },
        // {
        //   text: "Project settings",
        //   icon: <SettingsIcon />,
        //   MuiListItemButton: {
        //     href: "/settings/project-settings",
        //     selected: location.pathname === "/settings/project-settings"
        //   }
        // }
      ),
    [user, location]
  )

  return (
    <>
      <ThemeProvider theme={innerTheme}>
        <SidebarProvider>
          <SidebarWrapper>
            <SettingsSidebar items={inboxItems} />
          </SidebarWrapper>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
