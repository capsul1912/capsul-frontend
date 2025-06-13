import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { type ICreateProjectPayload, usePostProject } from "../api/use-post-project.ts"

function CreateProjectForm() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  console.log("User:", user?.current_organization)
  const { mutate, isPending, isError, error } = usePostProject()
  console.log("Error:", error)
  console.log("isError:", isError)
  console
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateProjectPayload>({
    defaultValues: {
      name: "",
      use_cache: true,
      use_annotation: true,
      organization: user?.current_organization
    }
  })

  const onCancel = () => {}

  const onSubmit = (data: ICreateProjectPayload) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/main")
      },
      onError: err => {
        console.error("Failed to create project:", err)
      }
    })
  }

  // Check for specific validation error
  const isUniqueValidationError =
    isError &&
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object" &&
    (error as any).response !== null &&
    "data" in (error as any).response &&
    // (error as any).response?.data?.type === "validation_error" &&
    (error as any).response?.data?.errors?.some(
      (err: any) => err.code === "unique" && err.detail === "The fields organization, name must make a unique set."
    )

  return (
    <div className="mx-auto max-w-[500px] py-8">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Create a new project</h1>
        <p className="mt-2 text-gray-500">The future of bug reporting starts here.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="mt-6">
          <Label htmlFor="project-name" className="font-medium text-sm">
            Project name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="project-name"
            placeholder="Project name"
            className="mt-2"
            {...register("name", {
              required: "Project name is required",
              minLength: {
                value: 1,
                message: "Project name must be at least 1 character"
              },
              maxLength: {
                value: 255,
                message: "Project name must not exceed 255 characters"
              }
            })}
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        {isUniqueValidationError && <p className="mt-2 text-red-500 text-sm">A project with this name was created</p>}
        {isError && !isUniqueValidationError && <p className="mt-2 text-red-500 text-sm">Error: {error?.message || "Failed to create project"}</p>}
        <div className="mt-4 flex w-full items-center gap-2">
          <Button type="submit" className="bg-blue-500 text-white" disabled={isPending}>
            {isPending ? "Creating..." : "Create project"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="text-red-500" disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
