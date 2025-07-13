import type { IMessageSender } from "@/entities/message/types"
import { colors } from "@/shared/theme"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

export const MessageBox = styled(Box, { shouldForwardProp: prop => !["originPosition"].includes(prop.toString()) })<{
  sender?: IMessageSender
  originPosition?: "left" | "right"
}>(({ theme }) => [
  {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    variants: [
      {
        props: props => props.sender === "CLIENT",
        style: {
          backgroundColor: colors.grey[200]
        }
      },
      {
        props: props => props.sender === "CLIENT",
        style: theme.applyStyles("dark", {
          backgroundColor: colors.common.black
        })
      },
      {
        props: props => props.sender === "AGENT",
        style: {
          backgroundColor: colors.primary[200]
        }
      },
      {
        props: props => props.originPosition === "left",
        style: {
          borderRadius: "0 8px 8px 8px"
        }
      }
    ]
  }
])
