import { colors } from "@/shared/theme"
import MenuIcon from "@mui/icons-material/Menu"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import { listItemButtonClasses } from "@mui/material/ListItemButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { darken, styled } from "@mui/material/styles"

const shortWidth = "240px"
const longWidth = "320px"

export const ChatSelectMain = styled(Box, { shouldForwardProp: prop => !["open"].includes(prop.toString()) })<{ open: boolean }>(({ theme }) => [
  {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    flexShrink: 0,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: shortWidth
        }
      },
      {
        props: ({ open }) => !open,
        style: {
          borderRadius: 4,
          width: longWidth
        }
      }
    ]
  }
])

export const ChatSelectHeader = styled(
  ({
    open,
    setOpen,
    className,
    children
  }: {
    open: boolean
    setOpen: (cb: (value: boolean) => boolean) => void
    className?: string
    children: React.ReactNode
  }) => (
    <Stack className={className} direction="row" alignItems="center">
      <IconButton onClick={() => setOpen(open => !open)}>{open ? <MenuOpenIcon /> : <MenuIcon />}</IconButton>
      <Typography fontSize={20} fontWeight={500} ml={1}>
        {children}
      </Typography>
    </Stack>
  )
)(({ theme }) => [
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

export const ChatSelectListWrapper = styled(Stack)(({ theme }) => [
  {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flexGrow: 1,
    justifyContent: "space-between",
    [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
      borderColor: colors.primary[200]
    }
  },
  theme.applyStyles("dark", {
    [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
      borderColor: colors.primary[500]
    }
  })
])
