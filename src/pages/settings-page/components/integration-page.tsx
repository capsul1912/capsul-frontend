import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Plus } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { TelegramModal } from "../../../features/telegram-bot/ui/telegram-modal"

interface IntegrationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  active?: boolean
  color: string
  onClick?: () => void
}

function IntegrationCard({ title, description, icon, active = false, color, onClick }: IntegrationCardProps) {
  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className={`${color} rounded p-2`}>{icon}</div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className={`h-8 w-8 rounded-full ${active ? "bg-blue-500 text-white" : "bg-gray-100"}`} onClick={onClick}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function IntegrationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="">
      <h1 className="mb-4 border-b pb-2 pl-4 font-medium text-xl">Integrations</h1>

      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
        <IntegrationCard
          title="Telegram"
          description="Sync your Telegram customer data with Capsul."
          icon={
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>
          }
          active={true}
          color="bg-blue-100"
          onClick={handleOpenModal}
        />

        <IntegrationCard
          title="Website"
          description="Install the SDK for JavaScript projects."
          icon={<div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-400 font-bold text-white">JS</div>}
          color="bg-yellow-100"
        />

        <IntegrationCard
          title="Website"
          description="Install the SDK for JavaScript projects."
          icon={<div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-400 font-bold text-white">JS</div>}
          color="bg-yellow-100"
        />
      </div>
      <TelegramModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
