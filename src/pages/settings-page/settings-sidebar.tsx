import { type IUser, authApi } from "@/shared/lib/api/auth-api"
import { cn } from "@/shared/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/shared/ui/sidebar.tsx"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Code, Layers, Paintbrush, Settings, Trash2, UserPlus } from "lucide-react"
import type { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface IMenuItem {
  title: string
  path: string
  icon: ReactNode | ((user?: IUser) => ReactNode)
}

const items: IMenuItem[] = [
  {
    title: "Profile",
    path: "profile",
    icon: (user?: IUser) => (
      <div className="-ml-px flex size-[19px] items-center justify-center rounded-full bg-gray-300 text-white text-xs">
        {user?.full_name ? user.full_name[0].toUpperCase() : "U"}
      </div>
    )
  },
  {
    title: "Invite",
    path: "invitation",
    icon: <UserPlus />
  },
  {
    title: "Installation",
    path: "installation",
    icon: <Code />
  },
  {
    title: "Customize",
    path: "customize",
    icon: <Paintbrush />
  },
  {
    title: "Integration",
    path: "integration",
    icon: <Layers />
  },
  {
    title: "Knowledge",
    path: "knowledge",
    icon: <BookOpen />
  },
  {
    title: "Delete bot",
    path: "delete",
    icon: <Trash2 />
  },
  {
    title: "Project settings",
    path: "project-settings",
    icon: <Settings />
  }
]

export default function SettingsSidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  return (
    <>
      <SidebarProvider className={"!w-[256px] z-[100] ml-[1.8rem] border-none"}>
        <Sidebar collapsible="icon" className={`!w-[256px] mt-auto ml-[55px] overflow-hidden border-none`}>
          <SidebarContent className="bg-zinc-100 p-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="flex items-center justify-between">
                  <h2 className={"mt-1 font-semibold text-xl text-zinc-900 transition"}>Invite</h2>
                </div>
                <SidebarMenu className="mt-3">
                  {items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        onClick={() => {
                          navigate(item.path)
                        }}
                        className={cn(
                          `hover:!bg-white flex cursor-pointer select-none items-center gap-2 border border-transparent text-sm hover:border-zinc-300 ${
                            !item ? "!border !border-zinc-300 bg-white shadow-sm" : "text-zinc-600 hover:bg-zinc-200/40"
                          }rounded-xl px-[12px] py-[12px] transition-all duration-150 `,
                          pathname === `/settings/${item.path}` && "!border-zinc-300 bg-white text-zinc-900 shadow-sm"
                        )}
                        asChild
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon === "function" ? item.icon(user) : item.icon}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}
