import { removeAuthTokens } from "@/api/cookies"
import { authApi } from "@/shared/lib/api/auth-api"
import CheckIcon from "@mui/icons-material/Check"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { dividerClasses } from "@mui/material/Divider"
import { listClasses } from "@mui/material/List"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { paperClasses } from "@mui/material/Paper"
import { useColorScheme } from "@mui/material/styles"
import { useQuery } from "@tanstack/react-query"
import { NestedMenuItem } from "mui-nested-menu"
import type React from "react"
import { useNavigate } from "react-router-dom"

type Mode = ReturnType<typeof useColorScheme>["mode"]

const getModeLabel = (mode: Mode) => {
  switch (mode) {
    case "light":
      return "Light"
    case "dark":
      return "Dark"
    default:
      return "Match system"
  }
}

type UserBoxProps = { anchorEl: HTMLElement | null; setAnchorEl: (element: HTMLElement | null) => void }
export const UserBox: React.FC<UserBoxProps> = ({ anchorEl, setAnchorEl }) => {
  const navigate = useNavigate()
  const { mode, setMode } = useColorScheme()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      removeAuthTokens()
      navigate("/login")
    } catch (e) {
      console.log(e)
    } finally {
      handleClose()
    }
  }

  if (!user) return null

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: -8, vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{
        [`& .${listClasses.root}`]: {
          padding: "4px"
        },
        [`& .${paperClasses.root}`]: {
          padding: 0
        },
        [`& .${dividerClasses.root}`]: {
          margin: "4px -4px"
        }
      }}
    >
      <NestedMenuItem label={`Theme: ${getModeLabel(mode)}`} parentMenuOpen={open}>
        {(["light", "dark", "system"] satisfies Mode[]).map((thisMode, index) => (
          <MenuItem onClick={() => setMode(thisMode)} key={index}>
            <ListItemText>{getModeLabel(thisMode)}</ListItemText>

            {(thisMode === mode || (thisMode === "system" && mode === null)) && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </NestedMenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemText>Logout</ListItemText>
        <ListItemIcon>
          <LogoutRoundedIcon fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  )
}
