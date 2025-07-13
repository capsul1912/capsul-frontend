import { useFetchProjects } from "@/pages/main/api/use-fetch-project"
import { Logo } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { mergeArray } from "@/shared/lib/utils"
import { colors } from "@/shared/theme"
import HomeIcon from "@mui/icons-material/Home"
import InboxIcon from "@mui/icons-material/Inbox"
import PinOffIcon from "@mui/icons-material/PushPin"
import PinIcon from "@mui/icons-material/PushPinOutlined"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton, { listItemButtonClasses, type ListItemButtonProps } from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ThemeProvider } from "@mui/material/styles"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useLocation } from "react-router-dom"
import { SidebarMain } from "./sidebar-components"
import { innerTheme } from "./theme"
import { UserBox } from "./userbox"

type ItemProp = {
  text: string
  icon: React.ReactNode
  MuiListItemButton?: ListItemButtonProps & { href?: string }
}

type SidebarProps = {
  width?: number
  pinned?: boolean
  setPinned?: (value: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ width: drawerWidth = 200, pinned = false, setPinned }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  const { data: projects } = useFetchProjects({
    // organization: "e9d3d89c-f85b-41cd-83ad-b3826b1c990d"
  })

  const lastProject = projects?.results?.[0]

  const location = useLocation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const mainListItems = React.useMemo(
    () =>
      mergeArray<ItemProp>(
        lastProject
          ? {
              text: "Inbox",
              icon: <InboxIcon />,
              MuiListItemButton: {
                href: `/${lastProject.id}/inbox`,
                selected: location.pathname.endsWith("/inbox")
              }
            }
          : undefined
      ),
    [location, lastProject]
  )

  const secondaryListItems = React.useMemo(
    () =>
      mergeArray<ItemProp>(
        {
          text: "Home",
          icon: <HomeIcon />,
          MuiListItemButton: {
            href: "/main",
            selected: location.pathname === "/main"
          }
        },
        { text: "Settings", icon: <SettingsRoundedIcon /> },
        {
          text: "Profile",
          icon: <Avatar sizes="small" alt={user?.full_name} sx={{ width: 16, height: 16, m: "2px" }} />,
          MuiListItemButton: {
            onClick: e => setAnchorEl(e.currentTarget)
          }
        }
      ),
    [location, user]
  )

  return (
    <SidebarMain
      width={drawerWidth}
      variant="permanent"
      hovered={!!anchorEl}
      sx={{
        display: { xs: "none", sm: "block" }
      }}
      pinned={pinned}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5
        }}
      >
        <Stack direction="row" spacing={1.2} justifyContent="space-between" alignItems="center" width="100%">
          <Stack direction="row" spacing={1.2} alignItems="center" pl={0.1}>
            <Logo className="h-5 w-5" />
            <Typography fontSize={14} fontWeight="bold">
              Capsul
            </Typography>
          </Stack>
          <IconButton onClick={() => setPinned?.(!pinned)}>{pinned ? <PinOffIcon /> : <PinIcon />}</IconButton>
        </Stack>
      </Box>

      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <ThemeProvider theme={innerTheme}>
          <Stack
            sx={[
              {
                flexGrow: 1,
                px: 1,
                justifyContent: "space-between",
                [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                  borderColor: colors.primary[200]
                }
              },
              theme =>
                theme.applyStyles("dark", {
                  [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                    borderColor: colors.primary[500]
                  }
                })
            ]}
          >
            <List dense>
              {mainListItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton {...item.MuiListItemButton}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List dense>
              {secondaryListItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton {...item.MuiListItemButton}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <UserBox anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </ThemeProvider>

        {/* <MenuContent /> */}
        {/* <CardAlert /> */}
      </Box>
    </SidebarMain>
  )
}
