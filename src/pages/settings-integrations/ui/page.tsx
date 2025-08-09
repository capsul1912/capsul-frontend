import { useFetchProjects } from "@/pages/main/api/use-fetch-project"
import { $api } from "@/shared/lib/api/client"
import mapDRFErrorToRHF from "@/shared/lib/drf-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import React from "react"
import { FormContainer, type SubmitHandler, TextFieldElement, useForm } from "react-hook-form-mui"
import z from "zod"

const schema = z.object({
  botApiToken: z.string().regex(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/, "Invalid telegram bot token")
  // isActive: z.boolean(),
})

type Schema = z.infer<typeof schema>

export const SettingsIntegrationsPage: React.FC = () => {
  const { data: telegramBots, isLoading: telegramBotsLoading, refetch } = $api.useQuery("get", "/api/v1/integrations/telegram-integrations/")
  const {
    mutate: mutateCreate,
    isPending: createIsPending,
    isSuccess: createIsSuccess,
    isError: createIsError,
    error: createError
  } = $api.useMutation("post", "/api/v1/integrations/telegram-integrations/")
  const {
    mutate: mutateUpdate,
    isPending: updateIsPending,
    isSuccess: updateIsSuccess,
    isError: updateIsError,
    error: updateError
  } = $api.useMutation("patch", "/api/v1/integrations/telegram-integrations/{id}/")

  const telegramBot = telegramBots?.results?.[0]

  const { data: projects } = useFetchProjects({
    // organization: "e9d3d89c-f85b-41cd-83ad-b3826b1c990d"
  })

  const project = projects?.results[0]

  const formContext = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      botApiToken: ""
      // isActive: true,
    }
  })

  const onSubmit: SubmitHandler<Schema> = data =>
    telegramBot
      ? mutateUpdate({
          params: {
            path: {
              id: telegramBot.id
            }
          },
          body: {
            bot_api_token: data.botApiToken
          }
        })
      : mutateCreate({
          body: {
            bot_api_token: data.botApiToken,
            project: project?.id ?? ""
          }
        })

  React.useEffect(() => {
    if (!createIsSuccess && !updateIsSuccess) return
    refetch()
  }, [createIsSuccess, updateIsSuccess, formContext.reset])

  React.useEffect(() => {
    if (!telegramBot) return
    formContext.setValue("botApiToken", telegramBot.bot_api_token)
  }, [telegramBot, formContext.setValue])

  React.useEffect(() => {
    if (createIsError) {
      mapDRFErrorToRHF({
        error: createError,
        schema,
        setError: formContext.setError,
        defaultNonFieldError: "botApiToken",
        mapFields: { bot_api_token: "botApiToken" }
      })
    }

    if (updateIsError) {
      mapDRFErrorToRHF({
        error: updateError,
        schema,
        setError: formContext.setError,
        defaultNonFieldError: "botApiToken",
        mapFields: { bot_api_token: "botApiToken" }
      })
    }
  }, [formContext.setError, createIsError, createError, updateIsError, updateError])

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Integrations</Typography>
      <Typography variant="h5">Telegram Bot</Typography>

      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Stack spacing={4}>
          <TextFieldElement
            name="botApiToken"
            control={formContext.control}
            label="Bot API token"
            fullWidth
            disabled={telegramBotsLoading || createIsPending || updateIsPending}
            helperText={
              <Typography fontSize={12}>
                Get API token from &nbsp;
                <Typography component="a" fontSize={12} sx={{ textDecoration: "underline" }} href="https://telegram.me/BotFather" target="_blank">
                  @BotFather
                </Typography>
              </Typography>
            }
          />
          {/* <CheckboxElement name="isActive" control={formContext.control} label="Is active" disabled={telegramBotsLoading || updateIsPending} /> */}

          <Button type="submit" variant="outlined" disabled={telegramBotsLoading || createIsPending || updateIsPending}>
            {telegramBot ? "Update" : "Create"}
          </Button>
        </Stack>
      </FormContainer>
    </Stack>
  )
}
