import { useChat } from "@/app/context/chat-context.tsx"
import type { IChatSession } from "@/features/project/model"
import { cn } from "@/shared/lib/helpers"
import { Badge } from "@/shared/ui/badge.tsx"
import { ScrollArea } from "@/shared/ui/scroll-area.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { formatDistanceToNow } from "date-fns"

interface IProps {
  items: IChatSession[]
  isLoading?: boolean
  search?: string
}

export function SessionList({ items, isLoading, search }: IProps) {
  // Helper Hooks
  const { currentSession, setCurrentSession } = useChat()

  return (
    <ScrollArea className="h-full">
      <div className="flex h-screen flex-col gap-2 overflow-auto p-4 pt-0 pb-[150px]">
        {search && !items.length ? <h3 className="mx-auto text-stone-400">No data was found with this session_id</h3> : null}
        {isLoading ? (
          <>
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
            <Skeleton className="min-h-[60px] rounded-xl" />
          </>
        ) : null}
        {items.map(item => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-2 text-left text-sm transition-all hover:bg-accent",
              currentSession?.id === item.id && "bg-muted"
            )}
            onClick={() => setCurrentSession(item)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex flex-grow items-center gap-2">
                  <div className="font-semibold">{item.session_id && item.session_id !== "null" ? item.session_id : "no session id found"}</div>
                  {/*{!item.read && (*/}
                  {/*{item && (*/}
                  {/*    <span className="flex h-2 w-2 rounded-full bg-red-600" />*/}
                  {/*)}*/}
                  {item && <span className="flex h-2 w-2 rounded-full bg-green-600" />}
                </div>
                <div className="flex flex-col items-end">
                  <Badge>12</Badge>
                  {/*<div className="flex size-6 items-center justify-center rounded-md bg-blue-700 text-sm text-white shadow shadow-blue-500">*/}
                  {/*    12*/}
                  {/*</div>*/}
                  <div className={cn("ml-auto text-[11px]", currentSession?.id === item.id ? "text-foreground" : "text-muted-foreground")}>
                    {formatDistanceToNow(new Date(item.start_time), {
                      addSuffix: true
                    })}
                  </div>
                </div>
              </div>
              {/*<div className="text-xs font-medium">*/}
              {/*    {item.subject}*/}
              {/*</div>*/}
              {/*<div className="mt-1 flex gap-3">*/}
              {/*    <div>Reply operator:</div>*/}
              {/*    <div className="font-bold">*/}
              {/*        {item.reply_operator ? <CheckIcon /> : 'no'}*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div className="flex gap-3">*/}
              {/*    <div>Total input tokens:</div>*/}
              {/*    <div>{item.total_input_tokens}</div>*/}
              {/*</div>*/}
              {/*<div className="flex gap-3">*/}
              {/*    <div>Total output tokens:</div>*/}
              {/*    <div>{item.total_output_tokens}</div>*/}
              {/*</div>*/}
            </div>
            {/*<div className="line-clamp-2 text-xs text-muted-foreground">*/}
            {/*    {item.session_id.substring(0, 300)}*/}
            {/*</div>*/}
            {/*{item.total_output_tokens ? (*/}
            {/*    <div className="flex items-center gap-2">*/}
            {/*        /!*{item.labels.map(label => (*!/*/}
            {/*        <Badge*/}
            {/*            key={item.total_output_tokens}*/}
            {/*            variant={getBadgeVariantFromLabel(*/}
            {/*                'important'*/}
            {/*            )}*/}
            {/*        >*/}
            {/*            output tokens: {item.total_output_tokens}*/}
            {/*        </Badge>*/}
            {/*        <Badge*/}
            {/*            key={item.total_output_tokens}*/}
            {/*            variant={getBadgeVariantFromLabel(*/}
            {/*                'important'*/}
            {/*            )}*/}
            {/*        >*/}
            {/*            input tokens: {item.total_input_tokens}*/}
            {/*        </Badge>*/}
            {/*        /!*))}*!/*/}
            {/*    </div>*/}
            {/*) : null}*/}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

// function getBadgeVariantFromLabel(
//     label: string
// ): ComponentProps<typeof Badge>['variant'] {
//     if (['important'].includes(label.toLowerCase())) {
//         return 'default';
//     }
//
//     if (['personal'].includes(label.toLowerCase())) {
//         return 'outline';
//     }
//
//     return 'secondary';
// }
