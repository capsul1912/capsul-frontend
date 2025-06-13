import { SpinnerIcon } from "@/shared/icons"
import { authApi } from "@/shared/lib/api/auth-api"
import { capitalizeFirstLetter } from "@/shared/lib/helpers/capitalize-first-letter"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import TipTapEditor from "./tip-tap-test"

const profileSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email address")
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Fetch user data
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser
  })

  useEffect(() => {
    // if (!localStorage.getItem("accessToken")) {
    //   navigate("/login")
    // }
    // Set default form values when user data is loaded
    if (user) {
      form.reset({
        organizationName: capitalizeFirstLetter(user.full_name) || "",
        email: user.email || ""
      })
    }
  }, [user, navigate])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      organizationName: "",
      email: ""
    }
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data, profileImage)
    // Handle form submission (e.g., update user profile via API)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className=" w-full ">
      <h1 className="mb-4 border-b-2 px-4 pb-2 font-medium text-xl">Profile settings</h1>

      <div className="px-4">
        <div className="mb-6">
          <div
            className={cn(
              "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border",
              isUserLoading && "animate-pulse duration-1000"
            )}
          >
            {isUserLoading ? (
              <SpinnerIcon className="-ml-2 size-12" reactClassName="fill-primary" />
            ) : profileImage ? (
              <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            )}
            <label htmlFor="profile-image" className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-blue-500 p-1">
              <Plus className="h-4 w-4 text-white" />
              <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Organization name *</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Organization name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">E-Mail *</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600">
              Save
            </Button>
          </form>
        </Form>
      </div>
      <TipTapEditor />
    </div>
  )
}
