import type { FieldValues, UseFormSetError } from "react-hook-form"
import { type ZodObject, z } from "zod"

const errorSchema = z.object({
  type: z.literal("validation_error"),
  errors: z
    .object({
      attr: z.string(),
      code: z.string(),
      detail: z.string()
    })
    .array()
})

type MapDRFErrorToRHF<
  Shape extends z.ZodRawShape,
  TFieldValues extends FieldValues = z.infer<ZodObject<Shape>>,
  SetError extends UseFormSetError<TFieldValues> = UseFormSetError<TFieldValues>
> = {
  error: unknown
  schema: ZodObject<Shape>
  setError: SetError
  defaultNonFieldError?: Parameters<SetError>["0"]
  mapFields?: Record<string, keyof TFieldValues>
}
export default function mapDRFErrorToRHF<Shape extends z.ZodRawShape>({ error, setError, mapFields, defaultNonFieldError }: MapDRFErrorToRHF<Shape>) {
  const { data, success } = errorSchema.safeParse(error)

  if (!success) return

  for (const err of data.errors) {
    if (err.attr === "non_field_errors" && defaultNonFieldError) {
      setError(defaultNonFieldError, { message: err.detail })
    } else {
      const field = mapFields?.[err.attr] ?? err.attr
      setError(field as any, { message: err.detail })
    }
  }
}
