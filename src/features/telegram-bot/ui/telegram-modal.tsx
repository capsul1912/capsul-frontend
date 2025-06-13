import { type ITelegramBot, usePostTelegramIntegration } from "@/features/telegram-bot/api/use-post-telegram-integration"
import { useProjectStore } from "@/pages/inbox-page/model/store"
import { Button } from "@/shared/ui/button"
import { CardDescription } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"

interface TelegramFormData {
  bot_api_token: string
}

export function TelegramModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  const { selectedProjectId } = useProjectStore()

  // Queries
  const { mutate, isPending, isError, error } = usePostTelegramIntegration()
  console.log("selectedProjectId", selectedProjectId)

  // Form
  const { register, handleSubmit, reset } = useForm<TelegramFormData>({
    defaultValues: {
      bot_api_token: ""
    }
  })

  const onSubmit = (data: TelegramFormData) => {
    if (!selectedProjectId) {
      alert("Please select a project first")
      return
    }

    const telegramBotData: ITelegramBot = {
      bot_api_token: data.bot_api_token,
      project: selectedProjectId,
      is_active: true
    }

    mutate(telegramBotData, {
      onSuccess: () => {
        reset()
        onClose()
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Telegram token</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isPending}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="mb-4 text-gray-600 text-sm">
          Copy and paste this code snippet before the closing {"</head>"} tag on every page you want Gleap to appear.
        </CardDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-2 block font-medium text-gray-700 text-sm">Telegram token</label>
          <div className="mb-4 flex items-center rounded p-2">
            <Input type="text" {...register("bot_api_token")} className="flex-1 text-sm focus:ring-0" />
          </div>
          {isError && <p className="mb-4 text-red-500 text-sm">{error?.message || "An error occurred"}</p>}
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={isPending || !selectedProjectId}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  )
}
