import { InboxProvider } from "@/app/context/inbox-context.tsx"
import { Outlet } from "react-router-dom"

export default function SettingsPage() {
  return (
    <InboxProvider>
      <div className=" w-full bg-white p-6">
        <Outlet />
      </div>
    </InboxProvider>
  )
}
