import { $api } from "@/shared/lib/api/client"
import { useAuthStore } from "@/shared/lib/store/auth-store"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import React from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string()
})

type Schema = z.infer<typeof schema>

export const SettingsProfilePage: React.FC = () => {
  const { mutate } = $api.useMutation("patch", "/api/v1/accounts/me/")

  const { user } = useAuthStore()

  const { handleSubmit, control, getValues, setValue } = useForm<Schema>({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  })

  React.useEffect(() => {
    if (!user) return
    const values = getValues()
    if (values.firstName !== "") {
      return
    }

    setValue("firstName", user.full_name.split(" ")[0])
    setValue("lastName", user.full_name.split(" ").slice(1).join(" "))
  }, [user])

  const onSubmit: SubmitHandler<Schema> = data => {
    const fullName = [data.firstName, data.lastName].filter(s => s.length > 0).join(" ")
    mutate({
      body: {
        full_name: fullName
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Typography variant="h4">Profile</Typography>
        <Stack direction="row" spacing={2}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField variant="outlined" label="First name" fullWidth {...field} />}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField variant="outlined" label="Last name" fullWidth {...field} />}
          />
        </Stack>
        <Button type="submit" variant="outlined">
          Save
        </Button>
      </Stack>
    </form>
  )
}
