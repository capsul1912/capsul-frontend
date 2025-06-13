import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar.tsx"
import Identicon from "@/shared/ui/identicon.tsx"
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar.tsx"

export function SessionCardItemSkeleton() {
  // States
  return (
    <SidebarMenuItem className="mt-1 border-[#DEE0E3] border-b hover:rounded-xl">
      <SidebarMenuButton
        className={cn("!border[#DEE0E3] group hover:!border-[#B4C7F8] h-auto rounded-xl border border-transparent px-1.5 hover:bg-[#F0F4FE]")}
        asChild
      >
        <button className="flex animate-pulse flex-col duration-1000">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-white">
                  <Identicon className="blur-[3px]" value={Math.random().toString()} size={80} />
                </AvatarFallback>
              </Avatar>
              <p className="h-4 w-32 rounded-[4px] bg-zinc-200 font-semibold text-[#6F6D74] text-sm"></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-14 rounded-[4px] bg-gray-100 text-[#14151A] text-[10px]"></div>
              <button>
                <SkeletonItem />
              </button>
            </div>
          </div>
          <div className="flex h-3.5 w-32 w-full flex-grow items-center truncate text-ellipsis rounded-[4px] bg-gray-100 text-[#696D7C] text-xs"></div>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SkeletonItem = () => <span className="h-2 w-4 rounded-md bg-gray-300" />
