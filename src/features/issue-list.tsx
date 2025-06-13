import { type IIssue, useResolveIssueMutation } from "@/features/issue/model"
import { cn } from "@/shared/lib/helpers"
import { Badge } from "@/shared/ui/badge.tsx"
import { SecondaryButton } from "@/shared/ui/buttons"
import { ScrollArea } from "@/shared/ui/scroll-area.tsx"
import { Skeleton } from "@/shared/ui/skeleton.tsx"
import { CheckIcon } from "@radix-ui/react-icons"
import { formatDistanceToNow } from "date-fns"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"

interface MailListProps {
  issues: IIssue[]
  isLoading?: boolean
  search?: string
  selectedIssue: IIssue | null
  goToMessage: (id: string) => void
  setSelectedIssue: Dispatch<SetStateAction<IIssue | null>>
}

export function IssueList({ issues, isLoading, goToMessage, search, selectedIssue, setSelectedIssue }: MailListProps) {
  // console.log('issues list here ', issues.length);
  // States
  const [currentLoadingIssueId, setCurrentLoadingIssueId] = useState<string | null>(null)

  // Queries
  const [resolveIssue, { isLoading: resolvingIssue }] = useResolveIssueMutation()

  // Effects
  useEffect(() => {
    if (!resolvingIssue) setCurrentLoadingIssueId(null)
  }, [resolvingIssue])

  // Functions
  function handleAnswer(issue_id: string, isAnswered: boolean) {
    setCurrentLoadingIssueId(issue_id)
    resolveIssue({
      issue_id,
      body: {
        value: isAnswered ? "not-answer" : "answer"
      }
    })
  }

  // console.log('issues');
  // console.log(issues);

  return (
    <ScrollArea className="h-full py-4">
      <div className="mx-2 flex flex-col gap-2 overflow-auto p-4 pt-0">
        <h2 className="mt-1 mb-2 text-sm">{issues.length ? "Messages awaiting reply:" : "No open issues"}</h2>
        {search && !issues.length ? <h3 className="mx-auto text-stone-400">No message was found with this issue</h3> : null}
        {isLoading ? (
          <>
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
            <Skeleton className="h-[125px] rounded-xl" />
          </>
        ) : null}
        {issues.map(issue => (
          <button
            key={issue.id}
            onClick={() => {
              if (issue.chatlog?.id) goToMessage(issue.chatlog?.id)
              setSelectedIssue(issue)
            }}
          >
            <Badge
              variant="secondary"
              className={cn(
                "flex flex-col items-start gap-3 rounded-lg border border-gray-300 p-3 text-left text-sm transition-all hover:bg-accent hover:bg-red-400",
                "hover:bg-gray-200"
                // selectedIssue?.id === issue.id && 'bg-muted'
              )}
            >
              <div className="flex w-full flex-col">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {/*<div className="text-xs font-semibold">*/}
                    {/*    {issue.id}*/}
                    {/*{issue.id &&*/}
                    {/*issue.session_id !== 'null'*/}
                    {/*    ? issue.session_id*/}
                    {/*    : 'no session id found'}*/}
                    {/*</div>*/}
                    {/*{!item.read && (*/}
                    {!issue.id && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                </div>
                {/*<div className="text-xs font-medium">*/}
                {/*    {item.subject}*/}
                {/*</div>*/}
                {/*<div className="mt-1 flex gap-3">*/}
                {/*    <div>Reply operator:</div>*/}
                {/*    <div className="font-bold">*/}
                {/*        {issue.reply_operator ? (*/}
                {/*            <CheckIcon />*/}
                {/*        ) : (*/}
                {/*            'no'*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="flex gap-3">*/}
                {/*    <div>Total input tokens:</div>*/}
                {/*    <div>{issue.total_input_tokens}</div>*/}
                {/*</div>*/}
                <div className="flex gap-3 border-0 border-gray-400 border-l-2 py-2 pl-3">{issue.chatlog?.message}</div>
                {/*<Badge variant={'destructive'}>*/}
                {/*    {issue.chatlog?.id}*/}
                {/*</Badge>*/}
                {/*<div className="mt-2 flex gap-3">*/}
                {/*    <div>chatlog:</div>*/}
                {/*    <Badge variant={'outline'}>*/}
                {/*        {issue.chatlog}*/}
                {/*    </Badge>*/}
                {/*</div>*/}
              </div>
              {/*<div className="line-clamp-2 text-xs text-muted-foreground">*/}
              {/*    {item.session_id.substring(0, 300)}*/}
              {/*</div>*/}
              {/*{issue.priority ? (*/}
              <div className="flex w-full items-center justify-between gap-2">
                {/*{issue.labels.map(label => (*/}
                {/*<Badge variant="default">*/}
                {/*    status: {issue.status}*/}
                {/*</Badge>*/}
                {/*<div className="flex gap-1">*/}
                {/*<Badge variant="outline">*/}
                {/*    {issue.priority}*/}
                {/*</Badge>*/}
                {issue.status === "open" ? (
                  <SecondaryButton
                    size="sm"
                    loading={resolvingIssue && currentLoadingIssueId === issue.id}
                    onClick={() => handleAnswer(issue.id, false)}
                  >
                    Not Answered
                  </SecondaryButton>
                ) : (
                  <SecondaryButton
                    loading={resolvingIssue && currentLoadingIssueId === issue.id}
                    size="sm"
                    onClick={() => handleAnswer(issue.id, true)}
                  >
                    Answered
                    <CheckIcon className="-mt-px ml-1" />
                  </SecondaryButton>
                )}
                {/*</div>*/}
                {/*<Badge*/}
                {/*    key={issue.total_output_tokens}*/}
                {/*    variant={getBadgeVariantFromLabel(*/}
                {/*        'important'*/}
                {/*    )}*/}
                {/*>*/}
                {/*    input tokens: {issue.total_input_tokens}*/}
                {/*</Badge>*/}
                {/*))}*/}
                <div className={cn("ml-auto text-xs", selectedIssue?.id === issue.id ? "text-gray-400" : "text-gray-400")}>
                  {issue.updated_at
                    ? formatDistanceToNow(new Date(issue.created_at), {
                        addSuffix: true
                      })
                    : ""}
                </div>
              </div>
              {/*// ) : null}*/}
            </Badge>
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
