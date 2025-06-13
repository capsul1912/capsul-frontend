import { useTheme } from "@/app/context/theme-context"
import { SpinnerIcon } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx"
import { Switch } from "@/shared/ui/switch.tsx"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, FileText, LogOut, Monitor, Moon, Sun, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ProfilePopoverProps {
  onLogout: () => void
  loggingOut?: boolean
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ onLogout, loggingOut }) => {
  // Helpers
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const { setUser } = useAuthStore()

  // States
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  // Functions
  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    if (theme === "dark" && !isDarkMode) {
      toggleTheme()
    } else if (theme === "light" && isDarkMode) {
      toggleTheme()
    }
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex size-[28px] cursor-pointer items-center justify-center" onClick={() => setIsPopoverOpen(true)}>
          {isLoading ? (
            <SpinnerIcon className="-ml-2 size-12" reactClassName="fill-primary" />
          ) : (
            <Avatar className="size-[26px] rounded-sm">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{user?.full_name ? getInitials(user.full_name) : "CN"}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        className={`z-[888] ml-3 w-64 rounded-lg p-4 shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
      >
        {/* Theme section */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-sm">Theme</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleThemeChange("dark")} className={`rounded-full p-1 ${isDarkMode ? "bg-gray-600" : "hover:bg-gray-200"}`}>
              <Moon className="h-5 w-5" />
            </button>
            <button onClick={() => handleThemeChange("light")} className={`rounded-full p-1 ${!isDarkMode ? "bg-gray-600" : "hover:bg-gray-200"}`}>
              <Sun className="h-5 w-5 text-orange-500" />
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className="flex size-[32px] items-center justify-center rounded-full p-1 hover:bg-gray-200"
            >
              <Monitor className="size-4" />
            </button>
          </div>
        </div>

        {/* Available section */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-sm">Available</span>
          <Switch checked={isAvailable} onCheckedChange={setIsAvailable} className="data-[state=checked]:bg-green-500" />
        </div>

        {/* Language section */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-sm">Language</span>
          <div className="flex items-center gap-1">
            <img src="https://flagcdn.com/w20/gb.png" alt="English flag" className="h-4 w-4 rounded-full" />
            <span className="text-sm">Eng</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Profile button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/settings/profile")}
            className={`flex h-9 w-full items-center gap-2 rounded-md p-2 ${
              isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>

          {/* Documentation button */}
          <button
            className={`flex h-9 w-full items-center gap-2 rounded-md p-2 ${
              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Documentation</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          disabled={loggingOut}
          className={`flex w-full items-center gap-2 rounded-md p-2 active:bg-zinc-200 ${
            isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {loggingOut ? <SpinnerIcon className="mr-2 h-5 w-5 animate-spin" reactClassName="fill-primary" /> : <LogOut className="h-5 w-5" />}
          <span>Logout</span>
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default ProfilePopover
