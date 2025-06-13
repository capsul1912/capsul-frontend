import { Label } from "@/shared/ui/label.tsx"
import { Switch } from "@/shared/ui/switch.tsx"
import type { SwitchProps } from "@radix-ui/react-switch"
import type { ControllerRenderProps, FieldError, FieldValues } from "react-hook-form"

interface IProps extends SwitchProps {
  field?: ControllerRenderProps<FieldValues, string>
  error?: FieldError | undefined
  labelPrevTitle?: string
  labelNextTitle?: string
}

function CustomSwitch({ labelPrevTitle, labelNextTitle, field, ...props }: IProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label className="cursor-pointer" htmlFor="airplane-mode">
        {labelPrevTitle}
      </Label>
      <Switch id="airplane-mode" {...field} {...props} />
      {/*<Switch id="airplane-mode" {...field} checked={field?.value} {...props} />*/}

      <Label className="cursor-pointer" htmlFor="airplane-mode">
        {labelNextTitle}
      </Label>
    </div>
  )
}

export default CustomSwitch
