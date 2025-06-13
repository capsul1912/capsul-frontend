type IProps = {}

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import type React from "react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const customizationSchema = z.object({
  logo: z.any().optional(),
  bgColor: z.string().min(4),
  actionColor: z.string().min(4),
  introMessage: z.string().optional()
})

type CustomizationForm = z.infer<typeof customizationSchema>

export default function CustomizationPage({}: IProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    // reset,
    // formState: { errors, isSubmitting }
    formState: { isSubmitting }
  } = useForm<CustomizationForm>({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      logo: undefined,
      bgColor: "#1100FF",
      actionColor: "#CC00FF",
      introMessage: "hey 👋, ask me question ....etc"
    }
  })
  console.log(logoFile, control)

  // Watch for live preview
  const bgColor = watch("bgColor")
  const actionColor = watch("actionColor")
  // const introMessage = watch("introMessage")

  // Logo upload/preview logic
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = ev => {
        setLogoUrl(ev.target?.result as string)
        setValue("logo", file)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleRemoveLogo = () => {
    setLogoUrl(null)
    setLogoFile(null)
    setValue("logo", undefined)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const onSubmit = (data: CustomizationForm) => {
    // Save logic here (API call, etc.)
    alert("Saved!\n" + JSON.stringify(data, null, 2))
  }

  return (
    <div className="flex h-full w-full flex-col gap-8 p-6 md:flex-row">
      {/* Left: Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-xl flex-1 flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow">
        <h2 className="mb-2 font-semibold text-lg">Customize your widget</h2>
        {/* Logo uploader */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Logo (1:1 resolution)</label>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-gray-300 border-dashed bg-gray-100">
            {logoUrl ? (
              <>
                <img src={logoUrl} alt="Logo preview" className="h-full w-full rounded-lg object-cover" />
                <button
                  type="button"
                  className="-top-2 -right-2 absolute flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow"
                  onClick={handleRemoveLogo}
                  aria-label="Remove logo"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="flex h-full w-full items-center justify-center text-3xl text-blue-500"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload logo"
                >
                  +
                </button>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleLogoChange} />
              </>
            )}
          </div>
        </div>
        {/* Background color */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Background color</label>
          <div className="flex items-center gap-2">
            <input type="color" className="h-10 w-10 rounded border" {...register("bgColor")} />
            <Input type="text" maxLength={7} className="w-24" {...register("bgColor")} />
          </div>
        </div>
        {/* Action color */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Action color</label>
          <div className="flex items-center gap-2">
            <input type="color" className="h-10 w-10 rounded border" {...register("actionColor")} />
            <Input type="text" maxLength={7} className="w-24" {...register("actionColor")} />
          </div>
        </div>
        {/* Intro message */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Intro message <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <Textarea rows={2} className="resize-none" placeholder="hey 👋, ask me question ....etc" {...register("introMessage")} />
        </div>
        {/* Save button */}
        <Button type="submit" className="mt-2 w-32" disabled={isSubmitting}>
          Save changes
        </Button>
      </form>
      {/* Right: Widget preview */}
      <div className="flex flex-1 items-start justify-center">
        <div className="flex min-h-[600px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center rounded-t-2xl px-4 py-3" style={{ background: bgColor }}>
            <Avatar className="mr-2 h-8 w-8 bg-white">{logoUrl ? <AvatarImage src={logoUrl} /> : <AvatarFallback>C</AvatarFallback>}</Avatar>
            <span className="font-bold text-base text-white">Capsul AI</span>
            <span className="ml-auto text-white/80 text-xs">Answering now...</span>
          </div>
          {/* Chat body */}
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-gray-50 px-2 py-4">
            {/* User message */}
            <div className="flex items-start gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-white px-3 py-2 text-sm shadow">Can you route me to the human?</div>
            </div>
            {/* AI summary */}
            <div className="flex items-start gap-2">
              <Avatar className="h-7 w-7 bg-violet-500">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs shadow">
                <div className="mb-1 font-semibold">Summary:</div>
                <div>The user was unable to find an answer to their inquiry and requested to connect with the support team.</div>
                <div className="mt-1 font-semibold">Key Points:</div>
              </div>
            </div>
            {/* Human reply */}
            <div className="flex items-start gap-2">
              <Avatar className="h-7 w-7 bg-pink-200">
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-blue-100 px-3 py-2 text-sm shadow">Hi there</div>
            </div>
          </div>
          {/* Input area */}
          <div className="flex items-center gap-2 border-gray-200 border-t px-4 py-3">
            <Input
              className="flex-1 rounded-full border-none bg-gray-100 px-4 focus:outline-none focus:ring-0"
              placeholder="Hi Capsul AI team"
              disabled
            />
            <Button
              type="button"
              style={{ background: actionColor, color: "#fff" }}
              className="flex h-10 w-10 items-center justify-center rounded-full p-0 shadow"
              disabled
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path fill="currentColor" d="M3.172 16.828a4 4 0 0 1 0-5.656l7.071-7.07a4 4 0 1 1 5.657 5.656l-7.072 7.07a4 4 0 0 1-5.656 0Z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
