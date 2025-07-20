import { colors } from "@/shared/theme"
import Box, { boxClasses } from "@mui/material/Box"
import { listItemButtonClasses } from "@mui/material/ListItemButton"
import Stack from "@mui/material/Stack"
import Typography, { type TypographyProps } from "@mui/material/Typography"
import { darken, styled } from "@mui/material/styles"

const width = "160px"
const padding = 1.2

export const InboxMain = styled(Box)<{ open: boolean }>(({ theme }) => [
  {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: colors.primary[300],
    padding: theme.spacing(padding),
    width: width,
    flexShrink: 0,
    transition: theme.transitions.create(["width", "padding", "opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [`& > .${boxClasses.root}`]: {
      width: `calc(${width} - ${theme.spacing(padding)} - ${theme.spacing(padding)})`
    },
    variants: [
      {
        props: ({ open }) => !open,
        style: {
          width: 0,
          padding: `${theme.spacing(padding)} 0`,
          opacity: 0
        }
      }
    ]
  },
  theme.applyStyles("dark", {
    borderRightColor: darken(colors.primary[600], 0.5)
  })
])

export const InboxTypography = styled((props: TypographyProps) => <Typography fontSize={20} fontWeight={500} ml={1} {...props} />)(({ theme }) => [
  { padding: theme.spacing(2 - padding - 0.4) }
])

export const InboxListWrapper = styled(Stack)(({ theme }) => [
  {
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
