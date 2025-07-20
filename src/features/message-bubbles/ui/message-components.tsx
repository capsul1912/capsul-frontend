import type { IMessageSender } from "@/entities/message/types"
import { colors } from "@/shared/theme"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

export const MessageBox = styled(Box, { shouldForwardProp: prop => !["sender"].includes(prop.toString()) })<{
  sender?: IMessageSender
}>(({ theme }) => [
  {
    width: "100%",
    textWrap: "wrap",
    overflowWrap: "break-word",
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
          backgroundColor: colors.grey[700]
        })
      },
      {
        props: props => props.sender === "AGENT",
        style: {
          backgroundColor: colors.primary[100]
        }
      },
      {
        props: props => props.sender === "AGENT",
        style: theme.applyStyles("dark", {
          backgroundColor: colors.primary[100]
        })
      },
      {
        props: props => props.sender === "OPERATOR",
        style: {
          backgroundColor: colors.primary[50],
          borderRadius: "8px 8px 0 8px"
        }
      },
      {
        props: props => props.sender === "OPERATOR",
        style: theme.applyStyles("dark", {
          backgroundColor: colors.primary[700]
        })
      },
      {
        props: props => props.sender !== "OPERATOR",
        style: {
          borderRadius: "0 8px 8px 8px"
        }
      }
    ]
  }
])
