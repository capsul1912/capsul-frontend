import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table.tsx"
import { format } from "date-fns"
import { PencilIcon, TrashIcon } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useFetchOrganizationById } from "../api/use-fetch-organization"
import { useFetchProjects } from "../api/use-fetch-project"

function OrganizationSettings() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const organizationId = searchParams.get("organization")

  const { data: organization, isLoading: isOrgLoading, isError: isOrgError, error: orgError } = useFetchOrganizationById(organizationId || "")

  // Fetch projects list
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
    error: projectsErrorMsg
  } = useFetchProjects(organizationId ? { organization: organizationId } : undefined)

  if (!organizationId) {
    return <div className="mx-auto max-w-[1000px] py-8 text-center text-red-500">Organization ID not found. Please provide a valid URL.</div>
  }

  return (
    <div className="mx-auto max-w-[1000px] py-8">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Organization Settings</h1>
        <p className="mt-2 text-gray-500">Capsul was built for teams.</p>
      </div>
      <div className="mt-8">
        <div className="flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-lg border border-gray-300 border-dashed">
            <img
              src={organization?.logo || "https://via.placeholder.com/128x128.png?text=Image"}
              alt="Organization"
              className="h-full w-full rounded-lg object-cover"
            />
            <div className="absolute right-2 bottom-2">
              <Button variant="default" className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 p-0 text-white">
                <span className="text-lg">+</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Label htmlFor="org-name" className="font-medium text-sm">
            Organization Name <span className="text-red-500">*</span>
          </Label>
          {isOrgLoading ? (
            <div className="mt-2 text-gray-500">Loading...</div>
          ) : isOrgError ? (
            <div className="mt-2 text-red-500">Error: {orgError?.message || "Failed to fetch organization name"}</div>
          ) : (
            <Input id="org-name" defaultValue={organization?.name || "Oybek AI"} readOnly className="mt-2 w-[300px]" />
          )}
        </div>

        {/* Projects Table */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg ">Projects</h2>
          {projectsLoading ? (
            <div className="mt-4 text-center text-gray-500">Loading...</div>
          ) : projectsError ? (
            <div className="mt-4 text-center text-red-500">Error: {projectsErrorMsg?.message || "Failed to fetch projects"}</div>
          ) : projects?.count === 0 ? (
            <div className="mt-4 text-center text-gray-500">No projects found</div>
          ) : (
            <div className="mt-4 w-[800px] rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Collection Name</TableHead>
                    <TableHead>Use Cache</TableHead>
                    <TableHead>Use Annotation</TableHead>
                    <TableHead>Agent Switch</TableHead>
                    {/* <TableHead>Organization Name</TableHead> */}
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects?.results?.map(project => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.collection_name || "Unknown"}</TableCell>
                      <TableCell>{project.use_cache ? "Yes" : "No"}</TableCell>
                      <TableCell>{project.use_annotation ? "Yes" : "No"}</TableCell>
                      <TableCell>{project.agent_switch ? "Yes" : "No"}</TableCell>
                      {/* <TableCell>{project.organization_name || "Unknown"}</TableCell> */}
                      <TableCell>{format(new Date(project.created_at), "dd.MM.yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="p-1">
                            <PencilIcon className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="mt-6 flex min-w-[800px] items-center justify-between">
          <div className="flex gap-2">
            <Button className="bg-blue-500 text-white">Save changes</Button>
            <Button variant="destructive">Delete organization</Button>
          </div>
          <Button variant="outline" onClick={() => navigate("/main")} className="text-gray-500">
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrganizationSettings
