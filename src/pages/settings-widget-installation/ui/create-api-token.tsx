import { $api } from "@/shared/lib/api/client"
import mapDRFErrorToRHF from "@/shared/lib/drf-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import dayjs, { type Dayjs } from "dayjs"
import React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FormContainer, TextFieldElement } from "react-hook-form-mui"
import { DatePickerElement } from "react-hook-form-mui/date-pickers"
import z from "zod"

type CreateNewTeamProps = {
  open: boolean
  setOpen: (sa: React.SetStateAction<boolean>) => void
  projectId: string
  refetch: () => void
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  expiresAt: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .nullish()
    .refine(date => {
      return date ? dayjs().isBefore(date) : true
    }, "The date must be in the future")
})

type Schema = z.infer<typeof schema>

export const CreateNewApiToken: React.FC<CreateNewTeamProps> = ({ open, setOpen, projectId, refetch }) => {
  const { mutate, isPending, isSuccess, isError, error } = $api.useMutation("post", "/api/v1/inbox/project-api-keys/")

  const formContext = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      expiresAt: null
    }
  })

  const onSubmit: SubmitHandler<Schema> = data =>
    mutate({
      body: {
        name: data.name,
        project: projectId,
        active: true,
        expires_at: data.expiresAt?.toDate().toISOString()
      }
    })

  React.useEffect(() => {
    if (!isSuccess) return

    formContext.reset()
    refetch()
    setOpen(false)
  }, [isSuccess, formContext.reset, setOpen])

  React.useEffect(() => {
    if (!isError) return
    mapDRFErrorToRHF({ error, schema, setError: formContext.setError, defaultNonFieldError: "name" })
  }, [isError, formContext.setError, error])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Stack sx={style} spacing={4}>
          <Typography variant="h5">Create new API token</Typography>

          <TextFieldElement name="name" control={formContext.control} label="Name" fullWidth disabled={isPending} />

          <DatePickerElement name="expiresAt" control={formContext.control} label="Expires at" disabled={isPending} disablePast />

          <Button type="submit" variant="outlined" disabled={isPending}>
            Create
          </Button>
        </Stack>
      </FormContainer>
    </Modal>
  )
}
