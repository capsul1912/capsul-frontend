import CssBaseline from "@mui/material/CssBaseline"
import type { LinkProps } from "@mui/material/Link"
import * as MuiColors from "@mui/material/colors"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import React from "react"
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom"

export const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>((props, ref) => {
  const { href, ...other } = props
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

export const colors = {
  primary: MuiColors.deepPurple,
  ...MuiColors
}

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
        disableRipple: true
      }
    }
  },
  colorSchemes: {
    dark: true
  },
  palette: {
    primary: {
      main: colors.primary[500],
      ...colors.primary
    }
  }
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  )
}
