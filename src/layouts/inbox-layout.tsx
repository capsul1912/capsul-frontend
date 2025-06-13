import { InboxProvider } from "@/app/context/inbox-context.tsx"
import InboxPage from "@/pages/inbox-page"
import MenuSidebar from "@/widgets/menu-sidebar/ui/menu-sidebar.tsx"

export default function InboxLayout() {
  return (
    <InboxProvider>
      <MenuSidebar />
      <InboxPage />
    </InboxProvider>
  )
}
