import { AudioRecorder } from "@/features/audio-recorder/ui/for-main-chat/audio-recorder.tsx"
import { MessageInputToggle } from "@/features/chat/ui/message-input-toggle.tsx"
import GifPicker from "@/features/gifs/ui/gif-picker.tsx"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { X } from "lucide-react"
import "./main-message-input.css"
import { useMessageOptimisticUpdate } from "@/entities/message/api/use-send-message.ts"
import { InputBubbleMenu } from "@/features/bubble-menu.tsx"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { useAudio } from "@/shared/hooks"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { colors } from "@/shared/theme"
import type { IChatMessage } from "@/widgets/chat-section/chat-section.tsx"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
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
    console.log("helloe", content)
    if (!(editor && content && currentTicket?.id && user?.id)) {
      return
    }

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
    if (!(files && files.length > 0)) {
      return
    }

    const filesArray = Array.from(files)
    const newAttachedFiles: File[] = []

    filesArray.forEach(file => {
      if (!file.type.startsWith("image/")) {
        newAttachedFiles.push(file)
        return
      }

      // Handle image files (insert into editor)
      const reader = new FileReader()
      reader.onload = readerEvent => {
        const base64Image = readerEvent.target?.result
        if (!(typeof base64Image === "string" && editor)) {
          return
        }

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
      reader.readAsDataURL(file)
    })
    // Update attachedFiles state with newly selected non-image files
    setAttachedFiles(prevFiles => [...prevFiles, ...newAttachedFiles])
    event.target.value = "" // Clear file input
  }

  const handleRemoveAttachedFile = (fileToRemove: File) => {
    setAttachedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove))
  }

  if (!editor) return null

  return (
    <Stack
      sx={[
        {
          minHeight: 200,
          position: "relative",
          borderRadius: 4,
          m: 1,
          p: 2,
          backgroundColor: colors.primary[50],
          borderWidth: 1
        },
        theme =>
          theme.applyStyles("dark", {
            backgroundColor: colors.primary[900],
            borderColor: colors.primary[800],
            color: colors.common.white
          })
      ]}
    >
      {/* <div className="absolute bottom-0 mx-auto mb-1 flex h-auto min-h-[190px] w-[90%] max-w-[900px] flex-col rounded-2xl border border-[#DEE0E3] bg-white p-3 shadow-lg"> */}
      <div className="flex justify-between">
        <MessageInputToggle />
      </div>
      <InputBubbleMenu editor={editor} />
      <Box
        sx={[
          {
            "& .ProseMirror": {
              color: colors.common.black
            }
          },
          theme =>
            theme.applyStyles("dark", {
              "& .ProseMirror": {
                color: colors.common.white
              }
            })
        ]}
        className="relative w-full flex-1 flex-grow"
      >
        <EditorContent className="main-message-input text-sm" editor={editor} />
      </Box>

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
                className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-gray-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-400"
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
          <IconButton onClick={handlePaperclipClick}>
            <AttachFileIcon />
          </IconButton>
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
          <Button variant="contained" onClick={handleSend} disabled={!editor?.getText()}>
            {/* <Send className="h-4 w-4" /> */}
            Send
          </Button>
        </div>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} accept="image/*, .pdf, .doc, .docx, .txt" />
      {/* </div> */}
    </Stack>
  )
}
