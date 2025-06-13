import type { LinkProps } from "react-router-dom"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

interface IProps extends LinkProps {
  isActive?: boolean
}

function TabButton({ className, isActive, ...props }: IProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "rounded-md bg-white px-3 py-1 text-[#111] text-sm no-underline shadow hover:bg-[#eee]",
        isActive ? "bg-primary text-white hover:bg-primary" : "",
        className
      )}
    />
  )
}

export default TabButton
