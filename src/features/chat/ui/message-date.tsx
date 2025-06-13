import { formatDistanceToNow } from "date-fns"

interface IProps {
  date: number | string | Date
}

function MessageDate({ date }: IProps) {
  return (
    <div className="sticky top-0 z-20 self-center rounded-full bg-bg-light px-3 py-1 text-[#14151A] text-xs">
      {formatDistanceToNow(new Date(date), {
        addSuffix: true
      })}
    </div>
  )
}

export default MessageDate
