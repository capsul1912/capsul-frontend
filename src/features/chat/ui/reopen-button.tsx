import { Button } from "@/shared/ui/button.tsx"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip.tsx"
import { Archive, ChevronDown, Eye, GitMerge, History, Link, RotateCwIcon, Trash2 } from "lucide-react"

export default function Component() {
  return (
    <div className="-space-x-px inline-flex divide-x divide-primary-foreground/30 rounded-lg shadow-black/5 shadow-sm rtl:space-x-reverse">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10">
            <RotateCwIcon />
            Reopen
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reopen conversation</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10" size="icon" aria-label="Options">
                <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Show ticket actions</TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[200px] p-2">
          <DropdownMenuItem className="cursor-pointer p-2">
            <Archive className="mr-2 h-4 w-4" />
            <span>Archive ticket</span>
            {/*<span className="ml-auto text-xs text-muted-foreground">*/}
            {/*    Ctrl Shift O*/}
            {/*</span>*/}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2">
            <Eye className="mr-2 h-4 w-4" />
            <span>Set as unread</span>
            {/*<span className="ml-auto text-xs text-muted-foreground">*/}
            {/*    Ctrl Shift L*/}
            {/*</span>*/}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2">
            <Link className="mr-2 h-4 w-4" />
            <span>Copy share link</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2">
            <GitMerge className="mr-2 h-4 w-4" />
            <span>Merge with similar</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2">
            <History className="mr-2 h-4 w-4" />
            <span>Show history</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!text-destructive cursor-pointer p-2 text-destructive active:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete ticket</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
