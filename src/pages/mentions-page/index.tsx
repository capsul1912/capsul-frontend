import { ResizablePanel } from "@/shared/ui/resizable.tsx"
import type * as React from "react"

interface MailProps {
  accounts?: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails?: []
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export default function MentionsPage({ defaultLayout = [20, 32, 48] }: MailProps) {
  // const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  // const [mail] = useMail();

  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <h2 className="m-3 font-medium text-lg">Mentions Page</h2>
      </ResizablePanel>
    </>
  )
}
