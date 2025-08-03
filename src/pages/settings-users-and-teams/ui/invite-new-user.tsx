import type { components } from "@/shared/lib/api/api"
import { $api } from "@/shared/lib/api/client"
import mapDRFErrorToRHF from "@/shared/lib/drf-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FormContainer, SelectElement, TextFieldElement } from "react-hook-form-mui"
import z from "zod"

type InviteNewUserProps = {
  open: boolean
  setOpen: (sa: React.SetStateAction<boolean>) => void
  teams: components["schemas"]["Team"][]
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string(),
  email: z.string(),
  team: z.number(),
  role: z.enum(["ADMIN", "MEMBER"])
})

type Schema = z.infer<typeof schema>

export const InviteNewUser: React.FC<InviteNewUserProps> = ({ open, setOpen, teams, projectId, refetch }) => {
  const { mutate, isPending, isSuccess, isError, error } = $api.useMutation("post", "/api/v1/accounts/create-invite/")

  const formContext = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      team: -1,
      role: "MEMBER"
    }
  })

  const onSubmit: SubmitHandler<Schema> = data =>
    mutate({
      body: {
        full_name: [data.firstName, data.lastName].filter(s => s.length > 0).join(" "),
        email: data.email,
        project: projectId,
        team: data.team === -1 ? undefined : data.team,
        role: data.role
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
    mapDRFErrorToRHF({ error, schema, setError: formContext.setError, defaultNonFieldError: "firstName" })
  }, [isError, formContext.setError, error])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Stack sx={style} spacing={4}>
          <Typography variant="h5">Invite new user</Typography>

          <TextFieldElement name="firstName" control={formContext.control} label="First name" fullWidth disabled={isPending} />

          <TextFieldElement name="lastName" control={formContext.control} label="Last name" fullWidth disabled={isPending} />

          <TextFieldElement
            // type="email"
            name="email"
            control={formContext.control}
            label="Email"
            fullWidth
            disabled={isPending}
          />

          <SelectElement
            name="team"
            control={formContext.control}
            label="Team"
            fullWidth
            disabled={isPending}
            options={[{ id: -1, label: "<No team>" }].concat(teams.map(t => ({ id: t.id, label: t.name })))}
          />

          <SelectElement
            name="role"
            control={formContext.control}
            label="Role"
            fullWidth
            disabled={isPending}
            options={[
              { id: "MEMBER", label: "Member" },
              { id: "ADMIN", label: "Admin" }
            ]}
          />

          <Button type="submit" variant="outlined" disabled={isPending}>
            Invite
          </Button>
        </Stack>
      </FormContainer>
    </Modal>
  )
}
