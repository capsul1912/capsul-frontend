import { SpinnerIcon } from "@/shared/icons"
import { cn } from "@/shared/lib/helpers"
import type { ButtonProps } from "@/shared/ui/button.tsx"
import { Button } from "@/shared/ui/button.tsx"

interface IProps extends ButtonProps {
  loading?: boolean
}

function DangerButton({ className, children, loading, ...props }: IProps) {
  return (
    <Button
      className={cn(
        "my-0 bg-secondary py-0 text-red-500 transition duration-0 hover:bg-red-500 hover:text-red-50 active:scale-95 active:bg-red-600",
        className
      )}
      variant="destructive"
      disabled={loading}
      {...props}
    >
      {loading ? <SpinnerIcon className="-ml-2 size-8" reactClassName="fill-red-400" /> : ""}
      {children}
    </Button>
  )
}

export default DangerButton
