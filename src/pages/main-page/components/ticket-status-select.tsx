import type { ITicketStatus } from "@/entities/ticket/types.ts"
import { StatusDot } from "@/shared/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { useTicketsStore } from "@/widgets/menu-sidebar/model/store.ts"
import { useId } from "react"

export default function TicketStatusSelect() {
  // Helpers
  const id = useId()

  // Store
  const { setFilters } = useTicketsStore()

  return (
    <div className="min-w-[100px] space-y-2">
      {/*<Label htmlFor={id}>Status select</Label>*/}
      <Select
        defaultValue={"ALL"}
        onValueChange={status => {
          setFilters({ status: status as ITicketStatus })
        }}
      >
        <SelectTrigger id={id} className="gap-3 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="z-[200] [&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
          <SelectItem value="ALL">
            <div className="flex items-center gap-2">
              <StatusDot className="text-zinc-200" />
              <div className="truncate text-xs">All</div>
            </div>
          </SelectItem>
          <SelectItem value="OPEN">
            <div className="flex items-center gap-2">
              <StatusDot className="text-blue-500" />
              <div className="truncate text-xs">Open 4</div>
            </div>
          </SelectItem>
          {/*<SelectItem value="4">*/}
          {/*    <div className="flex items-center gap-2">*/}
          {/*        <StatusDot className="text-gray-500" />*/}
          {/*        <div className="truncate text-xs">Snoozed</div>*/}
          {/*    </div>*/}
          {/*</SelectItem>*/}
          <SelectItem value="CLOSED">
            <div className="flex items-center gap-2">
              <StatusDot className="text-emerald-500" />
              <div className="truncate text-xs">Closed</div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
