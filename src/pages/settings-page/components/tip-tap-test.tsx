import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
// components/BlogEditor.tsx
import { useState } from "react"
// import Underline from "@tiptap/extension-underline";

const BlogEditor = () => {
  const [htmlOutput, setHtmlOutput] = useState("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h2>Blog post yozishni shu yerda boshlang!</h2>",
    onUpdate({ editor }) {
      setHtmlOutput(editor.getHTML()) // HTML formatida olish uchun
      // setHtmlOutput(editor.getHTML()) // HTML formatida olish uchun
    }
  })

  const handleFormat = (format: string) => {
    if (!editor) return

    switch (format) {
      case "bold":
        editor.chain().focus().toggleBold().run()
        break
      case "italic":
        editor.chain().focus().toggleItalic().run()
        break
      // case "underline":
      //    editor.chain().focus().toggleUnderline().run();
      //    break;
      case "heading1":
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case "heading2":
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case "bulletList":
        editor.chain().focus().toggleBulletList().run()
        break
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run()
        break
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run()
        break
      default:
        break
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>📝 Blog Editor</h2>

      <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button onClick={() => handleFormat("bold")}>Bold</button>
        <button onClick={() => handleFormat("italic")}>Italic</button>
        <button onClick={() => handleFormat("underline")}>Underline</button>
        <button onClick={() => handleFormat("heading1")}>H1</button>
        <button onClick={() => handleFormat("heading2")}>H2</button>
        <button onClick={() => handleFormat("bulletList")}>List</button>
        <button onClick={() => handleFormat("blockquote")}>Quote</button>
        <button onClick={() => handleFormat("codeBlock")}>Code</button>
      </div>

      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
        <EditorContent editor={editor} />
      </div>

      <h3 style={{ marginTop: "20px" }}>📤 HTML chiqishi:</h3>
      <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "8px" }}>{htmlOutput}</pre>
    </div>
  )
}

export default BlogEditor
