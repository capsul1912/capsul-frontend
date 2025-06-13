import { setAppSidebar } from "@/features/project/model"
import NotificationPopover from "@/pages/main/components/notification-popover.tsx"
import ProfilePopover from "@/pages/main/components/profile-popover.tsx"
import { storageKeys } from "@/shared/constants"
import { InboxIcon, Logo, SettingsIcon } from "@/shared/icons"
import { getFromLocalStorage, setToLocalStorage, tryWithTransition } from "@/shared/lib/helpers"
import { useDispatch } from "@/shared/lib/store"
import { Button } from "@/shared/ui/button.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/shared/ui/sidebar"
import TooltipButton from "@/shared/ui/tooltip-button.tsx"
import { PinIcon } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const notifications = [
  {
    id: 1,
    name: "Guest",
    action: "has created a new ticket",
    message:
      "I noticed a $49.99 charge on my account that I don’t recognize. Can you help me understand what this is for? I thought my subscription was supposed to be $39.99 per month. I’m concerned about potential...",
    time: "Today 18:56",
    unread: true
  },
  {
    id: 2,
    name: "Guest",
    action: "has created a new ticket",
    message:
      "I can’t log into my account on the mobile app. I’ve tried resetting my password three times, but I keep getting an error message that says ‘Authentication Failed’.",
    time: "2 days ago 03:11",
    unread: true
  },
  {
    id: 3,
    name: "Guest",
    action: "has created a new ticket",
    message:
      "I’m experiencing a serious issue with my account. I can’t access my recovery email, and the system won’t let me reset my password. This account contains important professional documents and client infor...",
    time: "Sunday 12:15",
    unread: true
  },
  {
    id: 4,
    name: "Guest",
    action: "has created a new ticket",
    message:
      "I purchased a yearly subscription three months ago, but our company’s needs have changed dramatically. The service is no longer useful for our current workflow. I’d like to discuss a partial ref...",
    time: "24.03.2025 12:15",
    unread: false
  }
]

const items = [
  {
    title: "Inbox",
    url: "inbox",
    icon: (isActive: boolean) => <InboxIcon className={`-ml-px !p-0 *:fill-[#6F717C] ${isActive ? "*:!fill-white" : ""}`} />
  },
  {
    title: "Settings",
    url: "settings/profile/",
    icon: (isActive: boolean) => <SettingsIcon className={`-ml-[3px] !size-5 !p-0 *:fill-[#6F717C] ${isActive ? "*:!fill-white" : ""}`} />
  }
]

export default function AppSidebar() {
  // Helpers
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // States
  const [isPinned, setIsPinned] = useState(!!getFromLocalStorage(storageKeys.IS_SIDEBAR_PINNED))
  const [loggingOut, setLoggingOut] = useState(false)
  const [open, setOpen] = useState(isPinned)

  // Functions
  const handlePinSidebar = () => {
    const oldValue = !!getFromLocalStorage(storageKeys.IS_SIDEBAR_PINNED)
    const isPinned = !oldValue
    setToLocalStorage(storageKeys.IS_SIDEBAR_PINNED, isPinned)
    dispatch(setAppSidebar({ isPinned }))
    setIsPinned(isPinned)
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      // Clear authentication tokens
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      navigate("/login")
    } catch (e) {
      console.log(e)
    } finally {
      setLoggingOut(false)
    }
  }

  // Active page check function
  const isActivePage = (url: string) => {
    return location.pathname === url || (location.pathname === "/" && url === "/inbox")
  }

  return (
    <div
      className="z-[200] h-screen"
      onMouseEnter={() => {
        // if (!isPinned) setOpen(true);
      }}
      onMouseLeave={() => {
        // if (!isPinned) setOpen(false);
      }}
    >
      <SidebarProvider open={open} onOpenChange={setOpen} className="!h-[98%] bg-bg-light">
        <Sidebar
          collapsible="icon"
          className={`!h-[98%] my-auto overflow-hidden rounded-tr-lg rounded-br-lg border border-[#DEE0E3] bg-white shadow-section ${
            !open ? "!w-[48px]" : ""
          }`}
        >
          <SidebarContent className="bg-white">
            <SidebarGroup className="!flex !px-0 h-full flex-col items-center justify-center">
              <div className="mb-3 flex">
                <div
                  className="flex flex-grow cursor-pointer"
                  onClick={() => {
                    navigate("/main")
                  }}
                >
                  <Logo />
                </div>
                <Button variant="ghost" onClick={handlePinSidebar} className={`size-8 ${!open ? "hidden" : isPinned ? "bg-zinc-200" : ""}`}>
                  <PinIcon className={isPinned ? "*:fill-zinc-600 *:stroke-zinc-600" : ""} />
                </Button>
              </div>
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col items-center">
                  {items.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <TooltipButton
                        contentProps={{
                          side: "right",
                          className: "z-[800]"
                        }}
                        icon={
                          <SidebarMenuButton
                            onClick={() => {
                              tryWithTransition(() => {
                                navigate(item.url)
                              })
                            }}
                            className={`${
                              isActivePage(item.url) ? "!border-[#B4C7F8] hover:!bg-primary bg-primary" : ""
                            } !h-10 cursor-pointer rounded-[8px] border border-transparent hover:bg-zinc-200`}
                            asChild
                          >
                            <div>
                              {item.icon(isActivePage(item.url))}
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        }
                        tooltipText={item.title}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarGroupContent className="flex flex-grow items-end">
                <SidebarMenu>
                  <SidebarMenuItem className="text-center">
                    <SidebarMenuButton
                      className={`${
                        isActivePage("/settings") ? "hover:!bg-white bg-white shadow" : ""
                      } !h-10 mt-1 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-200/50`}
                      asChild
                    >
                      <TooltipButton
                        contentProps={{
                          side: "right",
                          className: "z-[800]"
                        }}
                        icon={<NotificationPopover notifications={notifications} />}
                        tooltipText="Notifications"
                        buttonClassName="hover:bg-primary active:bg-zinc-600"
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="text-center">
                    <SidebarMenuButton
                      className={`${
                        isActivePage("/profile") ? "!border-[#B4C7F8] hover:!bg-primary bg-primary" : ""
                      } !h-10 hover:!border-[#B4C7F8] hover:!bg-primary mt-1 rounded-xl border border-transparent bg-white`}
                      asChild
                    >
                      <TooltipButton
                        buttonClassName=" hover:bg-primary active:bg-zinc-600"
                        tooltipText="Profile"
                        contentProps={{
                          side: "right",
                          className: "z-[800]"
                        }}
                        icon={<ProfilePopover onLogout={handleLogout} loggingOut={loggingOut} />}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}
