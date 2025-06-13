import { ChatProvider } from "@/app/context/chat-context.tsx"
import { useFetchTelegramMessages } from "@/features/telegram-bot/api/use-fetch-telegram-messages"
import { ChatSection } from "@/widgets/chat-section/chat-section.tsx"
import RightAside from "@/widgets/right-aside/right-aside"

export default function InboxPage() {
  useFetchTelegramMessages()
  return (
    <ChatProvider>
      <div className="flex w-full flex-grow">
        <ChatSection />
        <RightAside />
      </div>
    </ChatProvider>
  )
}
