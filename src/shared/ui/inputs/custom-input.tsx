import { Input } from "@/shared/ui/input.tsx"
import { Label } from "@/shared/ui/label.tsx"
import type { HTMLAttributes } from "react"

interface IProps {
  label?: string
  loading?: boolean
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

function CustomInput({ label, loading, wrapperProps, ...props }: IProps) {
  return (
    <div className="flex w-full flex-col gap-1.5 text-primary" {...wrapperProps}>
      {label ? <Label htmlFor="picture">{label}</Label> : null}
      <Input name="name" className="rounded-md text-primary outline-primary" disabled={loading} {...props} />
    </div>
  )
}

export default CustomInput
