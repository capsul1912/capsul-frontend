import { colors } from "@/shared/theme"
import Paper from "@mui/material/Paper"
import Stack, { type StackProps } from "@mui/material/Stack"
import { darken, lighten, styled } from "@mui/material/styles"

export const SidebarWrapper = styled((props: StackProps) => <Stack direction="row" component={Paper} {...props} />)(({ theme }) => [
  {
    marginLeft: theme.spacing(0.2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 16,
    backgroundColor: lighten(colors.primary[50], 0.4)
  },
  theme.applyStyles("dark", {
    backgroundColor: darken(colors.primary[800], 0.75)
  })
])
