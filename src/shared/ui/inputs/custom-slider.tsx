import { Slider } from "@/shared/ui/slider.tsx"
import type { SliderProps } from "@radix-ui/react-slider"
import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface IProps extends SliderProps {
  wrapperProps?: HTMLAttributes<HTMLDivElement>
  title?: string
  showValue?: boolean
}

function CustomSlider({ wrapperProps, title, showValue, ...props }: IProps) {
  return (
    <div {...wrapperProps} className={twMerge("relative flex h-16 items-center gap-3 rounded-md py-2", props.className)}>
      {title ? <div className="flex-grow">{title}</div> : null}
      <div className="flex w-[70%] items-center gap-4 text-primary">
        <Slider max={100} step={1} {...props} />
        {showValue && props.value && <div className="text-xl">{props.value[0].toFixed(1)}</div>}
      </div>
    </div>
  )
}

export default CustomSlider
