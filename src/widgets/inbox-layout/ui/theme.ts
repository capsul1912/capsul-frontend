import { colors, theme } from "@/shared/theme"
import { listItemClasses } from "@mui/material/ListItem"
import { listItemIconClasses } from "@mui/material/ListItemIcon"
import { menuItemClasses } from "@mui/material/MenuItem"
import { typographyClasses } from "@mui/material/Typography"
import { createTheme } from "@mui/material/styles"
import deepmerge from "@mui/utils/deepmerge"

export const innerTheme = createTheme(
  deepmerge(theme, {
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            [`& > .${listItemClasses.root}:not(:last-child)`]: {
              marginBottom: theme.spacing(0.5)
            }
          }
        }
      },
      MuiListItemButton: {
        defaultProps: {
          disableGutters: true
        },
        styleOverrides: {
          root: {
            // padding: "0 2px",
            borderRadius: 6,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "transparent"
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 0,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            padding: theme.spacing(0.5),
            color: colors.primary[500]
          }
        }
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small"
        }
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            [`& .${menuItemClasses.root}`]: {
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1)
            },
            [`& .${menuItemClasses.root} > div > .${typographyClasses.root}`]: {
              paddingLeft: theme.spacing(0),
              paddingRight: theme.spacing(0)
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            [`& .${listItemIconClasses.root}`]: {
              ml: "auto",
              minWidth: 0,
              marginRight: 0,
              marginLeft: theme.spacing(2)
            }
          }
        }
      }
    }
  } satisfies Parameters<typeof createTheme>["0"])
)
