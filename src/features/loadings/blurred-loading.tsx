import { SpinnerIcon } from "@/shared/icons"
import type { HTMLAttributes, SVGProps } from "react"
import { twMerge } from "tailwind-merge"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean
  spinnerProps?: SVGProps<SVGSVGElement> & { reactClassName?: string }
}

const BlurredLoading = ({ visible, className, spinnerProps, children, ...props }: IProps) => {
  // Functions
  if (!visible) return null

  return (
    <div
      className={twMerge(
        "absolute inset-0 z-[900] flex h-full flex-col items-center justify-center bg-[rgba(255,255,255,.3)] backdrop-blur-[2px]",
        className
      )}
      {...props}
    >
      {children ? children : <SpinnerIcon {...spinnerProps} className={twMerge("-ml-2 size-8", spinnerProps?.className)} />}
    </div>
  )
}

export default BlurredLoading
