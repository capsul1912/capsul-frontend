import { Button } from "@/shared/ui/button"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { Switch } from "@/shared/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { FileIcon as FilePdf, FileSpreadsheet, FileText, PenLine, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

interface KnowledgeFile {
  id: string
  name: string
  type: "docx" | "xls" | "pdf"
  words: number
  retrievalCount: number
  uploadTime: string
  active: boolean
  selected?: boolean
}

export default function KnowledgePage() {
  const [files, setFiles] = useState<KnowledgeFile[]>([
    {
      id: "1",
      name: "Knowledge file.docx",
      type: "docx",
      words: 202,
      retrievalCount: 21,
      uploadTime: "06/11/2024 12:23",
      active: true,
      selected: false
    },
    {
      id: "2",
      name: "Knowledge file.xls",
      type: "xls",
      words: 503,
      retrievalCount: 34,
      uploadTime: "06/11/2024 16:23",
      active: true,
      selected: true
    },
    {
      id: "3",
      name: "Knowledge file.pdf",
      type: "pdf",
      words: 1023,
      retrievalCount: 403,
      uploadTime: "06/11/2024 16:29",
      active: false,
      selected: false
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("knowledge")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "xls":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "pdf":
        return <FilePdf className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const toggleFileStatus = (id: string) => {
    setFiles(files.map(file => (file.id === id ? { ...file, active: !file.active } : file)))
  }

  const toggleFileSelection = (id: string) => {
    setFiles(files.map(file => (file.id === id ? { ...file, selected: !file.selected } : file)))
  }

  const selectedCount = files.filter(file => file.selected).length

  const handleDeleteSelected = () => {
    setFiles(files.filter(file => !file.selected))
  }

  return (
    <div>
      <div className="mb-6 border-b-2 pb-5">
        <div className="flex items-center justify-between px-4">
          <h1 className="font-medium text-xl">Knowledge</h1>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="knowledge" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Knowledge
              </TabsTrigger>
              <TabsTrigger value="annotation" className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Annotation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-60">
            <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Metadata</Button>
            <Button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4" />
              Add file
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Words</TableHead>
              <TableHead>Retrieval count</TableHead>
              <TableHead>Upload time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Checkbox checked={file.selected} onCheckedChange={() => toggleFileSelection(file.id)} className="mr-2" />
                    {index + 1}
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  {file.name}
                </TableCell>
                <TableCell>{file.words}</TableCell>
                <TableCell>{file.retrievalCount}</TableCell>
                <TableCell>{file.uploadTime}</TableCell>
                <TableCell>
                  <Switch checked={file.active} onCheckedChange={() => toggleFileStatus(file.id)} />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                    <PenLine className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedCount > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm">{selectedCount} Selected</span>
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-red-200 text-red-500" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
