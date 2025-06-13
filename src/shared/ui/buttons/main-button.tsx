import { SpinnerIcon } from "@/shared/icons"
import type { ButtonProps } from "@/shared/ui/button.tsx"
import { Button } from "@/shared/ui/button.tsx"
import { twMerge } from "tailwind-merge"

interface IProps extends ButtonProps {
  loading?: boolean
}

function MainButton({ className, children, loading, ...props }: IProps) {
  return (
    <Button
      // variant="contained"
      {...props}
      disabled={props.disabled || loading}
      className={twMerge(
        "z-10 h-9 min-h-9 min-w-9 text-sm text-white *:stroke-white hover:bg-primary-light active:scale-95 disabled:bg-[#bbb] disabled:text-[#999]",
        className
      )}
    >
      {loading ? <SpinnerIcon className="-ml-2 size-11" /> : null}
      {children}
    </Button>
  )
}

export default MainButton
