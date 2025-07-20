import { colors } from "@/shared/theme"
import Drawer, { drawerClasses } from "@mui/material/Drawer"
import Paper from "@mui/material/Paper"
import Stack, { type StackProps } from "@mui/material/Stack"
import { darken, lighten, styled } from "@mui/material/styles"

const drawerWidth = 340

export const PageMain = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean
}>(({ theme }) => ({
  width: 0,
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  position: "relative",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: theme.spacing(0)
      }
    }
  ]
}))

export const PageHeader = styled((props: StackProps) => <Stack direction="row" alignItems="center" {...props} />)(({ theme }) => [
  {
    height: theme.spacing(7),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.primary[100]
  },
  theme.applyStyles("dark", {
    borderBottomColor: darken(colors.primary[600], 0.5)
  })
])

export const PagePaper = styled((props: StackProps) => <Stack component={Paper} {...props} />)(({ theme }) => [
  {
    backgroundColor: lighten(colors.primary[50], 0.8),
    height: "100%",
    borderRadius: 16
  },
  theme.applyStyles("dark", {
    backgroundColor: darken(colors.primary[900], 0.75)
  })
])

export const SidebarDrawer = styled(Drawer)(({ theme }) => [
  {
    width: drawerWidth,
    flexShrink: 0,
    [`& .${drawerClasses.paper}`]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: drawerWidth,
      backgroundColor: lighten(colors.primary[50], 0.4),
      border: 0,
      borderRadius: 20
    }
  },
  theme.applyStyles("dark", {
    [`& .${drawerClasses.paper}`]: {
      backgroundColor: darken(colors.primary[700], 0.75)
    }
  })
])
