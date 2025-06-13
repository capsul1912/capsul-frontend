import { cn } from "@/shared/lib/helpers/other-helpers.ts"
import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface IProps extends HTMLAttributes<HTMLInputElement> {
  wrapperProps?: HTMLAttributes<HTMLDivElement>
  title?: string
}

function CustomColorPicker({ wrapperProps, className, title, onChange, ...props }: IProps) {
  return (
    <div {...wrapperProps} className={twMerge("flex h-16 items-center gap-3 rounded-md px-6 py-2 shadow", wrapperProps?.className)}>
      <div className="flex-grow">{title}</div>
      <div className="w-[70%]">
        <input
          type="color"
          className={cn("custom-color-picker", className)}
          onChange={onChange}
          // onChange={(...args) => debounce(onChange, 300)(...args)}
          {...props}
        />
      </div>
    </div>
  )
}

export default CustomColorPicker
