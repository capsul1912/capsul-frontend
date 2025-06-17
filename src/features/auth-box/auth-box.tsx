import technoCityImage from "@/assets/images/techno-city-image.png"
import { Logo } from "@/shared/icons"
import MuiCard from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import type React from "react"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto 0 auto auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px"
  },
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}))

const AuthContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4)
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: `url(${technoCityImage})`,
    backgroundSize: "100%",
    backgroundPosition: "100% 60%",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {})
  }
}))

export type AuthBoxProps = { title?: string; subtitle?: string; children: React.ReactNode }

export const AuthBox: React.FC<AuthBoxProps> = ({ title, subtitle, children }) => {
  return (
    <AuthContainer direction="column" justifyContent="space-between">
      {" "}
      <Card variant="outlined">
        {" "}
        <Logo className="mx-auto h-[48px] w-[48px] text-white" />{" "}
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }} mb={-1}>
          {" "}
          {title}{" "}
        </Typography>{" "}
        <Typography component="h2" variant="h4" sx={{ width: "100%", fontSize: "clamp(1rem, 10vw, 1.2rem)" }} mb={2}>
          {" "}
          {subtitle}{" "}
        </Typography>{" "}
        {children}{" "}
      </Card>{" "}
    </AuthContainer>
  )
}
