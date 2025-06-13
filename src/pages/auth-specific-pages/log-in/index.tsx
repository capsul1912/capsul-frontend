import { CustomFormInput } from "@/features/form-specific"
import { useLoginMutation } from "@/features/form-specific/model"
import { setCurrentProject, setProjects } from "@/features/project/model"
import { storageKeys } from "@/shared/constants"
import {
  removeAccessToken,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  setToLocalStorage,
  setToSessionStorage
} from "@/shared/lib/helpers"
import { useDispatch } from "@/shared/lib/store"
import { MainButton } from "@/shared/ui/buttons"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

// Schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
})

// SchemaType
export type ILoginSchema = z.infer<typeof loginSchema>

const LogIn = () => {
  // Helper Hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  // Queries
  const [postLogin, { isLoading }] = useLoginMutation()

  // Functions
  async function handleLogin() {
    removeAccessToken()
    removeRefreshToken()
    const isValid = await methods.trigger()
    if (!isValid) return

    postLogin(methods.getValues())
      .unwrap()
      .then(res => {
        saveAccessToken(res.access)
        saveRefreshToken(res.refresh)
        dispatch(setProjects(res.user.projects))
        dispatch(setCurrentProject(res.user.projects?.[0]))
        setToSessionStorage(storageKeys.CURRENT_PROJECT, res.user.projects?.[0])
        setToLocalStorage(storageKeys.USER_DATA, res.user)
        navigate("/", { replace: true })
      })
  }

  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleLogin)}
          className="flex h-[340px] w-[360px] flex-col justify-center gap-2 rounded-xl px-6 py-4 shadow-[0_0_7px_0_#ccc]"
        >
          <h1 className="mb-2 self-center font-semibold text-2xl">{t("sign_in")}</h1>
          <CustomFormInput<ILoginSchema> label={t("username")} name="username" required />
          <CustomFormInput<ILoginSchema> label={t("password")} name="password" required />
          <div className="relative flex flex-col gap-3">
            <MainButton className="mt-4" loading={isLoading} type="submit" onClick={handleLogin}>
              {t("send")}
            </MainButton>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LogIn
