import { FormMessage } from "@/shared/ui/form.tsx"
import { Label } from "@/shared/ui/label.tsx"
import type { TextareaProps } from "@/shared/ui/textarea.tsx"
import { Textarea } from "@/shared/ui/textarea.tsx"
import type { HTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

interface IProps extends TextareaProps {
  fieldError?: FieldError
  label?: string
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

function TextareaWithLabel({ label, wrapperProps, fieldError, ...props }: IProps) {
  //
  const { t } = useTranslation()

  return (
    <div {...wrapperProps} className={twMerge("relative grid w-full gap-1.5 text-primary", wrapperProps?.className)}>
      <Label htmlFor="message">{label}</Label>
      <Textarea id="message" {...props} value={props.value} />
      {fieldError?.message && <FormMessage className="dark:text-red-500">{t(fieldError?.message)}</FormMessage>}
    </div>
  )
}

export default TextareaWithLabel
