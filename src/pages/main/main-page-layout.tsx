import { getAuthToken, removeAuthTokens } from "@/api/cookies"
import { Logo } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import NotificationPopover from "./components/notification-popover"
import ProfilePopover from "./components/profile-popover"

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
      "I can’t log into my account on加载 mobile app. I’ve tried resetting my password three times, but I keep getting an error message that says ‘Authentication Failed’.",
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

function MainPageLayout() {
  // Helper
  const navigate = useNavigate()

  // Store
  //   const { isCreateView, isCreateProjectView, isSettingsView } = useMainPageStore()
  const { setUser } = useAuthStore()

  // State
  const [loggingOut, setLoggingOut] = useState(false)

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })
  console.log("user", user)
  // Effects
  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  // Functions
  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      removeAuthTokens()
      navigate("/login")
    } catch (e) {
      console.log(e)
    } finally {
      setLoggingOut(false)
    }
  }

  // const displayName = isUserLoading ? null : user?.full_name || ""

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <div className="fixed top-0 left-0 flex h-screen w-52 flex-col justify-between border-gray-20 border-r">
        <div className="flex items-center justify-between p-10">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold">Capsul</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-10">
          <NotificationPopover notifications={notifications} />
          <ProfilePopover onLogout={handleLogout} loggingOut={loggingOut} />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default MainPageLayout
