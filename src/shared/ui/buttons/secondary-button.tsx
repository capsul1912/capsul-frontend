import { SpinnerIcon } from "@/shared/icons"
import { cn } from "@/shared/lib/helpers/other-helpers.ts"
import { Button, type ButtonProps } from "@/shared/ui/button.tsx"
import type { ReactNode } from "react"

interface IProps extends ButtonProps {
  loading?: boolean
  startIcon?: ReactNode
}

function SecondaryButton({ className, startIcon, children, loading, ...props }: IProps) {
  return (
    <Button
      className={cn(
        "custom-border my-0 flex select-none items-center bg-secondary py-0 text-primary duration-0 hover:bg-primary-foreground hover:text-gay-50 active:scale-95 active:bg-muted",
        className
      )}
      type="button"
      variant="destructive"
      disabled={loading}
      {...props}
    >
      {loading ? <SpinnerIcon className="-ml-2 size-8" /> : startIcon || ""}
      {children}
    </Button>
  )
}

export default SecondaryButton
