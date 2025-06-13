import { useCreateProjectApiKey } from "@/entities/project-api-key/api/use-create-project-api-key"
import { fetchProjectApiKey } from "@/entities/project-api-key/api/use-fetch-project-api-key"
import { useFetchProjectApiKeys } from "@/entities/project-api-key/api/use-fetch-project-api-keys"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function InstallationPage() {
  // States
  const { projectId } = useParams()

  // States
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [apiKeyName, setApiKeyName] = useState("")
  const [apiKeyActive, setApiKeyActive] = useState(true)
  const [apiKeyExpiresAt, setApiKeyExpiresAt] = useState<string | null>(null)
  const [fetchedKeys, setFetchedKeys] = useState<Record<string, string>>({})

  // Queries
  const { data, refetch } = useFetchProjectApiKeys({ project: projectId })
  const { mutate: createApiKey } = useCreateProjectApiKey()
  const apiKeys = data?.results

  // Effects
  useEffect(() => {
    if (apiKeys) {
      apiKeys.forEach(apiKey => {
        if (!fetchedKeys[apiKey.id]) {
          fetchProjectApiKey(apiKey.id).then(res => {
            setFetchedKeys(prev => ({
              ...prev,
              [apiKey.id]: res.key
            }))
          })
        }
      })
    }
  }, [apiKeys])

  // const handleCopy = (id: string) => {
  //   const apiKey = apiKeys?.find((key) => key.id === id)?.key;
  //   if (apiKey) {
  //     navigator.clipboard.writeText(apiKey);
  //     setCopiedId(id);
  //     setTimeout(() => setCopiedId(null), 2000);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createApiKey(
      {
        name: apiKeyName,
        project: projectId || "",
        active: apiKeyActive,
        expires_at: apiKeyExpiresAt || undefined
      },
      {
        onSuccess: () => {
          refetch()
          setApiKeyName("")
          setApiKeyActive(true)
          setApiKeyExpiresAt(null)
        }
      }
    )
  }

  return (
    <div>
      <h1 className="mb-4 border-b px-4 pb-2 font-medium text-xl">Install the Capsul</h1>

      <div className="px-4">
        <div className="mb-6">
          <h2 className="mb-4 font-medium text-xl">Create API Key</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="apiKeyName">API Key Name</Label>
              <Input id="apiKeyName" value={apiKeyName} onChange={e => setApiKeyName(e.target.value)} placeholder="Enter API key name" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="apiKeyActive">Active</Label>
                <select
                  id="apiKeyActive"
                  value={apiKeyActive ? "true" : "false"}
                  onChange={e => setApiKeyActive(e.target.value === "true")}
                  className="w-full rounded border p-2"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex-1">
                <Label htmlFor="apiKeyExpiresAt">Expires At</Label>
                <Input
                  id="apiKeyExpiresAt"
                  type="datetime-local"
                  value={apiKeyExpiresAt || ""}
                  onChange={e => setApiKeyExpiresAt(e.target.value || null)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create API Key
            </Button>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-medium text-xl">Current API Keys</h2>
          <div className="flex items-center gap-2 rounded bg-gray-100 px-3 py-1.5"></div>
        </div>

        <div className="mb-8 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires At</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>API Key</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys?.map(apiKey => (
                <TableRow key={apiKey.id}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>{apiKey.project_name}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 font-medium text-xs ${
                        apiKey.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apiKey.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>{apiKey.expires_at || "Never"}</TableCell>
                  <TableCell>{new Date(apiKey.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(apiKey.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-gray-600 text-sm">{fetchedKeys[apiKey.id] || "••••••••••"}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-auto px-2 py-1 text-sm ${copiedId === apiKey.id ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
                        onClick={() => {
                          const key = fetchedKeys[apiKey.id]
                          if (key) {
                            navigator.clipboard.writeText(key)
                            setCopiedId(apiKey.id)
                            setTimeout(() => setCopiedId(null), 2000)
                          }
                        }}
                      >
                        {copiedId === apiKey.id ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Card className="w-[434px] border">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="rounded bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M3 9h18" />
                  </svg>
                </div>
                <CardTitle className="text-base">Website</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-blue-100 text-blue-500">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription>Install the Capsul on your website.</CardDescription>
            </CardContent>
          </Card>

          <Card className="w-[434px] border">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="rounded bg-yellow-100 p-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-400 font-bold text-white">JS</div>
                </div>
                <CardTitle className="text-base">Website</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-100">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription>Install the SDK for JavaScript projects.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
