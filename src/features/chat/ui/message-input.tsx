import { AudioRecorder } from "@/features/audio-recorder/ui/for-main-chat/audio-recorder.tsx"
import { MessageInputToggle } from "@/features/chat/ui/message-input-toggle.tsx"
import GifPicker from "@/features/gifs/ui/gif-picker.tsx"
import { Button } from "@/shared/ui/button.tsx"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Paperclip, Send, X } from "lucide-react"
import "./main-message-input.css"
import { useMessageOptimisticUpdate } from "@/entities/message/api/use-send-message.ts"
import { InputBubbleMenu } from "@/features/bubble-menu.tsx"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { useAudio } from "@/shared/hooks"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { cn } from "@/shared/lib/utils"
import type { IChatMessage } from "@/widgets/chat-section/chat-section.tsx"
import { Dropcursor } from "@tiptap/extension-dropcursor"
import { useEffect, useRef, useState } from "react"
import sentSoundAudio from "/sounds/sent-sound.mp3"

interface IProps {
  onSend: (v: Partial<IChatMessage>) => void
}

export default function MessageInput({ onSend }: IProps) {
  // Helpers
  const { playSound } = useAudio({
    src: sentSoundAudio
  })
  // Store
  const { user } = useAuthStore()
  const { currentTicket, inputValue } = useChatStore()

  // Editor
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit,
      Image,
      Dropcursor.configure({
        color: "blue",
        width: 2
      }),
      Placeholder.configure({
        placeholder: "Hey there ..."
      })
    ],
    onPaste: event => {
      const items = Array.from(event.clipboardData?.items || [])
      const image = items.find(item => item.type.startsWith("image"))

      if (image) {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = event => {
          const base64Image = event.target?.result
          if (typeof base64Image === "string") {
            editor?.commands.insertContent([
              // Insert as an array
              {
                type: "image",
                attrs: {
                  src: base64Image
                }
              },
              {
                // Insert an empty paragraph node after
                type: "paragraph"
              }
            ])
            editor?.commands.focus("end") // Focus after insertion
          }
        }
        const imageFile = image?.getAsFile()
        if (imageFile) {
          reader.readAsDataURL(imageFile as Blob)
        }
        return true
      }
      return false
    }
  })
  const optimisticUpdate = useMessageOptimisticUpdate()

  // Queries

  // Effects
  useEffect(() => {
    if (editor && inputValue) {
      editor.commands.setContent(inputValue)
    }
  }, [editor, inputValue])

  // Functions
  const handleSend = () => {
    const content = editor?.getText()
    if (editor && content && currentTicket?.id && user?.id) {
      // const content = editor.getJSON();
      // sendMessage(content);
      optimisticUpdate({
        content,
        conversation: currentTicket?.id,
        type: "MESSAGE",
        role: "OPERATOR",
        created_at: new Date().toISOString()
      })
      playSound()
      onSend({
        content,
        role: "OPERATOR", // TODO: unneccessary
        type: "MESSAGE",
        author_id: user?.id
      })
      // mutate({ content, type: 'MESSAGE', conversation: currentTicket?.id });
      editor.commands.setContent("")
      setAttachedFiles([])
    }
  }

  const handleGifSelect = (gifUrl: string) => {
    if (editor) {
      editor?.commands.insertContent([
        {
          type: "image",
          attrs: {
            src: gifUrl
          }
        },
        {
          type: "paragraph" // create a new paragraph after the image
        }
      ])
      editor?.commands.focus("end")
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]) // State for attached files

  const handlePaperclipClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const filesArray = Array.from(files)
      const newAttachedFiles: File[] = []

      filesArray.forEach(file => {
        if (file.type.startsWith("image/")) {
          // Handle image files (insert into editor)
          const reader = new FileReader()
          reader.onload = readerEvent => {
            const base64Image = readerEvent.target?.result
            if (typeof base64Image === "string" && editor) {
              editor.commands.insertContent([
                {
                  type: "image",
                  attrs: {
                    src: base64Image
                  }
                },
                {
                  type: "paragraph"
                }
              ])
              editor.commands.focus("end")
            }
          }
          reader.readAsDataURL(file)
        } else {
          // Handle other files (add to attachedFiles state)
          newAttachedFiles.push(file)
        }
      })
      // Update attachedFiles state with newly selected non-image files
      setAttachedFiles(prevFiles => [...prevFiles, ...newAttachedFiles])
      event.target.value = "" // Clear file input
    }
  }

  const handleRemoveAttachedFile = (fileToRemove: File) => {
    setAttachedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove))
  }

  if (!editor) return null

  return (
    <div className="relative flex min-h-[195px] w-full justify-center">
      <div className="absolute bottom-0 mx-auto mb-1 flex h-auto min-h-[190px] w-[90%] max-w-[900px] flex-col rounded-2xl border border-[#DEE0E3] bg-white p-3 shadow-lg">
        <div className="flex justify-between">
          <MessageInputToggle />
        </div>
        <InputBubbleMenu editor={editor} />
        <div className="relative w-full flex-grow">
          <EditorContent className="main-message-input text-sm" editor={editor} />
        </div>

        {/* Display attached files as badges */}
        {attachedFiles.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div
                key={index}
                className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 font-medium text-gray-800 text-sm dark:bg-gray-700 dark:text-gray-300"
              >
                {file.name}
                <button
                  onClick={() => handleRemoveAttachedFile(file)}
                  type="button"
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-400"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="relative flex">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700"
              onClick={handlePaperclipClick}
            >
              <Paperclip className="h-5 w-5 *:stroke-[#14151A]" />
            </Button>
            <GifPicker onGifSelect={handleGifSelect} />
            {/*{[ImageIcon].map((Icon, index) => (*/}
            {/*    <Button*/}
            {/*        key={index}*/}
            {/*        variant="ghost"*/}
            {/*        size="icon"*/}
            {/*        className="rounded-lg p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700"*/}
            {/*    >*/}
            {/*        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />*/}
            {/*    </Button>*/}
            {/*))}*/}
          </div>

          <div className="flex gap-2">
            <AudioRecorder />
            <Button
              onClick={handleSend}
              disabled={!editor?.getText()}
              className={cn(
                "rounded-full bg-primary px-4 py-2 font-semibold text-sm text-white ring-4 ring-[#ECEEF9] transition-colors hover:bg-blue-600 active:bg-blue-700",
                !editor?.getText() && "bg-zinc-400 hover:bg-zinc-400"
              )}
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} accept="image/*, .pdf, .doc, .docx, .txt" />
      </div>
    </div>
  )
}
