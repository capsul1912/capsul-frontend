import { Button } from "@/shared/ui/button.tsx"
import { BubbleMenu, type BubbleMenuProps } from "@tiptap/react"
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "lucide-react"

export const InputBubbleMenu = ({
  editor
}: {
  editor: BubbleMenuProps["editor"]
}) => {
  if (!editor) return null

  return (
    <BubbleMenu editor={editor} className="flex gap-1 rounded-md bg-white p-1 shadow-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`transition-none ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`transition-none ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`transition-none ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Button>
    </BubbleMenu>
  )
}
