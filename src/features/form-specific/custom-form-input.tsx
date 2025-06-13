import { cn } from "@/shared/lib/helpers"
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form.tsx"
import { Input } from "@/shared/ui/input.tsx"
import type { HTMLAttributes, RefAttributes } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

export interface IFormInputProps<T = undefined> extends HTMLAttributes<HTMLDivElement>, RefAttributes<HTMLDivElement> {
  name: keyof T
  label: string
  loading?: boolean
  inputProps?: any
  required?: boolean
}

const CustomFormInput = <T,>({ name, label, inputProps, ...props }: IFormInputProps<T>) => {
  // Form Hooks
  const { control } = useFormContext()
  const { t } = useTranslation()

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem {...props}>
          <FormLabel className="text-primary">{label}</FormLabel>
          <FormControl>
            <Input {...field} {...inputProps} className={cn("text-primary", inputProps?.className)} />
          </FormControl>
          {error?.message && <p className="font-medium text-[0.8rem] text-destructive">{t(error?.message)}</p>}
        </FormItem>
      )}
    />
  )
}
export default CustomFormInput
