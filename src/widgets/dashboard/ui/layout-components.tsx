import { colors } from "@/shared/theme"
import { darken, lighten, styled } from "@mui/material/styles"

export const LayoutMain = styled("main")<{
  width: number
  pinned: boolean
}>(({ theme, width }) => [
  {
    paddingLeft: 46,
    flexGrow: 1,
    backgroundColor: lighten(colors.primary[50], 0.8),
    overflow: "auto",
    transition: theme.transitions.create(["padding", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    variants: [
      {
        props: ({ pinned }) => pinned,
        style: {
          paddingLeft: width,
          transition: theme.transitions.create(["padding", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
          })
        }
      }
    ]
  },
  theme.applyStyles("dark", {
    backgroundColor: darken(colors.primary[900], 0.8)
  })
])
