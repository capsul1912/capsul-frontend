import { Logo } from "@/shared/icons"
import { AIInput } from "@/shared/ui/ai-input"
import { Button } from "@/shared/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Copilot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [_, setIsLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string>("problem")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  console.log(_)
  const quickActions = [
    {
      id: "problem",
      label: "Do you have a problem?",
      variant: "default" as const
    },
    { id: "summarize", label: "Summarize", variant: "outline" as const },
    {
      id: "acknowledge",
      label: "Acknowledge ticket",
      variant: "outline" as const
    },
    {
      id: "resolve",
      label: "Write resolve message",
      variant: "outline" as const
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: `I'm working on your ${selectedAction} request regarding: "${inputMessage}". I'll update you shortly.`,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center border-b p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-[48px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 border-solid bg-white">
            <Logo />
          </div>
          <div className="text-center">
            <h2 className="font-semibold">Hi, I'm Chai 👋</h2>
            <p className="text-muted-foreground text-sm">Ask me anything about chatbot</p>
          </div>
        </div>
      </div>
      {/* <div className=" flex-1 space-y-4 overflow-y-auto p-4">
                <AnimatePresence initial={false}>
                    {messages.map(message => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <Card
                                className={`max-w-[80%] p-3 ${
                                    message.isUser
                                        ? 'bg-primary text-primary-foreground'
                                        : ''
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                <p className="mt-1 text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-1 text-muted-foreground"
                        >
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-100" />
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-200" />
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-300" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div> */}

      <div className="border-t p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {quickActions.map(action => (
            <Button
              key={action.id}
              variant={action.variant}
              size="sm"
              onClick={() => setSelectedAction(action.id)}
              className={`transition-all ${selectedAction === action.id ? "ring-2 ring-ring" : ""}`}
            >
              {action.label}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <AIInput
            onSubmit={value => {
              console.log("AI Copilot input:", value)
              // Handle AI Copilot input here
            }}
            placeholder="Ask AI Copilot..."
            className="w-full"
          />
        </form>
      </div>
    </motion.div>
  )
}
