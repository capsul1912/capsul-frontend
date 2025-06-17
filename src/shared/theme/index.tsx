import type { LinkProps } from "@mui/material/Link"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import React from "react"
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom"

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>((props, ref) => {
  const { href, ...other } = props
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
