import { RefreshIcon } from "@/shared/icons"
import { Button } from "@/shared/ui/button.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs.tsx"
import ChatDetails from "./components/chat-details"
import { Copilot } from "./components/copilot"

function RightAside() {
  return (
    <Tabs defaultValue="details" className="flex h-full min-w-[340px] max-w-[320px] flex-col overflow-hidden border-border/40 border-l bg-white">
      <div className="flex items-center gap-3 border-border border-b p-4">
        <TabsList className="mx-auto flex-grow rounded-full border border-[#DEE0E3] bg-white">
          <TabsTrigger
            value="details"
            className="w-1/2 rounded-full px-5 text-zinc-600 data-[state=active]:bg-primary data-[state=active]:text-white dark:text-zinc-200"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="copilot"
            className="w-1/2 rounded-full px-5 text-zinc-600 data-[state=active]:bg-primary data-[state=active]:text-white dark:text-zinc-200"
          >
            Ai Copilot
          </TabsTrigger>
        </TabsList>
        <Button variant="ghost" className="size-8 bg-white">
          <RefreshIcon />
        </Button>
      </div>
      <TabsContent value="details" className="m-0 overflow-hidden">
        <ChatDetails />
      </TabsContent>
      <TabsContent value="copilot" className="mt-0 h-full p-0">
        <Copilot />
      </TabsContent>
    </Tabs>
  )
}

export default RightAside
