import { useMainPageStore } from "@/pages/main/model/store.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { useRef, useState } from "react"
import { usePostOrganization } from "../api/use-post-organization.ts"

function AddOrganizationForm() {
  // Store
  const { setViewState } = useMainPageStore()

  // States
  const [name, setName] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Queries
  const { mutate, isPending, isError, error } = usePostOrganization()

  // Functions
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileName = file.name.length > 100 ? file.name.slice(0, 97) + "..." : file.name
      const newFile = new File([file], fileName, { type: file.type })
      setLogoFile(newFile)
    }
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  const onCancel = () => {
    setViewState("default")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      return
    }
    const formData = new FormData()
    formData.append("name", name)
    if (logoFile) {
      formData.append("logo", logoFile)
    }

    mutate(formData, {
      onSuccess: () => {
        setName("")
        setLogoFile(null)
        setViewState("default")
      },
      onError: err => {
        console.error("Tashkilot yaratishda xato:", err)
      }
    })
  }

  return (
    <div className="mx-auto max-w-[500px] py-8">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Create an organization</h1>
        <p className="mt-2 text-gray-500">Create an organization Capsul was built for teams.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8" encType="multipart/form-data">
        <div className="flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-lg border border-gray-300 border-dashed">
            {logoFile ? (
              <img src={URL.createObjectURL(logoFile)} alt="Logo oldindan ko‘rish" className="h-full w-full rounded-lg object-cover" />
            ) : (
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
            <div className="absolute right-2 bottom-2">
              <Button
                type="button"
                variant="default"
                onClick={handlePlusClick}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 p-0 text-white"
              >
                <span className="text-lg">+</span>
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Label htmlFor="org-name" className="font-medium text-sm">
            Organization name <span className="text-red-500">*</span>
          </Label>
          <Input id="org-name" placeholder="Organization name" className="mt-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        {isError && <p className="mt-2 text-red-500 text-sm">Error: {error?.message || "Tashkilot yaratishda xato yuz berdi"}</p>}
        <div className="mt-4 flex items-center gap-2">
          <Button type="submit" className="bg-blue-500 text-white" disabled={isPending || !name.trim()}>
            {isPending ? "Creating..." : "Create organization"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="text-red-500" disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddOrganizationForm
