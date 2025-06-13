import { CheckDoubleFill, Notification, XIcon } from "@/shared/icons" // Notification ikonkasini import qilamiz
// NotificationPopover.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx"
import { Switch } from "@/shared/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs.tsx"
import { Settings } from "lucide-react"
import { useState } from "react"

// Bildirishnoma ma'lumotlari uchun interfeys
interface NotificationItem {
  id: number
  name: string
  action: string
  message: string
  time: string
  unread: boolean
}

// Komponent uchun props interfeysi
interface NotificationPopoverProps {
  notifications: NotificationItem[]
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({ notifications }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className=" relative z-[9999] w-10 cursor-pointer" onClick={() => setIsPopoverOpen(true)}>
          <Notification className=" dark:*:fill-white" />
          <div className="-top-4 absolute left-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-center text-white text-xs">
            {notifications.filter(n => n.unread).length}
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent side="left" align="start" className="z-[9999] mb-4 max-h-[80vh] w-[500px] overflow-y-auto rounded-lg bg-white p-0 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Settings className="size-5 cursor-pointer" />
              <CheckDoubleFill className="size-5 cursor-pointer" />
              <Switch checked={isChecked} onCheckedChange={setIsChecked} className="cursor-pointer data-[state=checked]:bg-green-500" />
            </div>
            <XIcon onClick={() => setIsPopoverOpen(false)} className="cursor-pointer *:fill-[#6F717C]" />
          </div>
        </div>
        <Tabs defaultValue="all" className="w-auto text-center">
          <TabsList className="h-8 rounded-full p-px">
            <TabsTrigger value="all" className="h-full min-w-[98px] rounded-full">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="h-full min-w-[98px] rounded-full">
              Unread
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4 p-4">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-4 ${notification.unread ? "" : "bg-white"} border-gray-200 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="size-9">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-500">G</AvatarFallback>
                  </Avatar>
                  <h4 className="text-sm text-zinc-400">
                    <span className="mr-3 font-semibold text-zinc-800">{notification.name}</span>
                    {notification.action}
                  </h4>
                </div>
                <span className="text-gray-500 text-sm">{notification.time}</span>
              </div>
              <p className="mt-2 rounded-lg bg-[#F7F7F8] p-2 text-gray-600 text-sm">{notification.message}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopover
