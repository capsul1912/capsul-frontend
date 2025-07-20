import { colors } from "@/shared/theme"
import { boxClasses } from "@mui/material/Box"
import Drawer, { drawerClasses } from "@mui/material/Drawer"
import { typographyClasses } from "@mui/material/Typography"
import { darken, lighten, styled } from "@mui/material/styles"

export const SidebarMain = styled(Drawer)<{
  width: number
  pinned: boolean
  hovered: boolean
}>(({ theme, width }) => [
  {
    zIndex: 999,
    position: "fixed",
    width,
    flexShrink: 0,
    boxSizing: "border-box",
    // marginTop: theme.spacing(10),
    [`&, & .${drawerClasses.paper}`]: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderRightColor: "transparent"
    },
    [`&, & .${drawerClasses.paper}, &.${drawerClasses.docked} .${drawerClasses.paper}`]: {
      backgroundColor: lighten(colors.primary[50], 0.8)
    },
    [`& .${drawerClasses.paper}`]: {
      width,
      boxSizing: "border-box",
      backgroundColor: "background.paper"
    },
    [`& .${drawerClasses.paper} > .${boxClasses.root}`]: {
      overflow: "hidden"
    },
    [`& .${typographyClasses.root}`]: {
      transition: theme.transitions.create(["opacity"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    transition: theme.transitions.create(["margin", "width", "border-radius"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    variants: [
      {
        props: ({ pinned, hovered }) => !pinned && !hovered,
        style: {
          [`&:hover, &:hover .${drawerClasses.paper}`]: {
            width,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderRightColor: colors.primary[300]
          },
          [`&, & .${drawerClasses.paper}`]: {
            width: 46,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            transition: theme.transitions.create(["margin", "width", "border-radius"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          },
          [`&:hover .${typographyClasses.root}`]: {
            opacity: 1
          },
          [`& .${typographyClasses.root}`]: {
            opacity: 0,
            transition: theme.transitions.create(["opacity"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          }
        }
      }
    ]
  },
  theme.applyStyles("dark", {
    [`&, & .${drawerClasses.paper}, &.${drawerClasses.docked} .${drawerClasses.paper}`]: {
      backgroundColor: darken(colors.primary[900], 0.8)
    },
    [`&:hover, &:hover .${drawerClasses.paper}`]: {
      borderRightColor: darken(colors.primary[600], 0.5)
    }
  })
])
