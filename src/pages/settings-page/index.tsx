import { InboxProvider } from "@/app/context/inbox-context.tsx"
import { Outlet } from "react-router-dom"
import SettingsSidebar from "./settings-sidebar.tsx"

export default function SettingsPage() {
  return (
    <InboxProvider>
      <SettingsSidebar />
      <div className=" w-full bg-white p-6">
        <Outlet />
      </div>
    </InboxProvider>
  )
}
