import AppSidebar from "@/pages/main-page/app-sidebar.tsx"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  )
}
