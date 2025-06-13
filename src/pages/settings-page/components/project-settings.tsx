import { useDeleteProject, useFetchProjectById, useUpdateProject } from "@/pages/main/api/use-fetch-project"
import { toast } from "@/shared/lib/hooks/use-toast"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { FileText } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ProjectSettings = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState("knowledge")
  const [isEditing, setIsEditing] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmationName, setDeleteConfirmationName] = useState("")

  const { data: project, isLoading: isProjectLoading, isError: isProjectError, error: projectError } = useFetchProjectById(projectId || "")
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()

  const handleEdit = () => {
    setIsEditing(true)
    setProjectName(project?.name || "")
  }

  const handleSave = () => {
    if (projectName.trim()) {
      updateProject.mutate(
        { projectId: projectId || "", data: { name: projectName } },
        {
          onSuccess: () => {
            setIsEditing(false)
            toast({ title: "Success", description: "Project updated successfully" })
          },
          onError: (error: any) => {
            toast({
              title: "Error",
              description: error?.response?.data?.message || "Failed to update project",
              variant: "destructive"
            })
          }
        }
      )
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProjectName("")
  }

  const handleDeleteInitiate = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmationName.trim() === project?.name) {
      deleteProject.mutate(projectId || "", {
        onSuccess: () => {
          setIsDeleteModalOpen(false)
          setDeleteConfirmationName("")
          toast({ title: "Success", description: "Project deleted successfully" })
          navigate("/main")
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error?.response?.data?.message || "Failed to delete project",
            variant: "destructive"
          })
        }
      })
    } else {
      toast({
        title: "Error",
        description: "Project name does not match. Please enter the correct project name.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setDeleteConfirmationName("")
  }

  return (
    <div>
      <div className="mb-6 border-b-2 pb-5">
        <div className="flex items-center justify-between px-4">
          <h1 className="font-medium text-xl">Project settings</h1>
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
      <div className="mt-6 space-y-4">
        <div>
          <Label htmlFor="org-name" className="font-medium text-sm">
            Project name <span className="text-red-500">*</span>
          </Label>
          {isProjectLoading ? (
            <div className="mt-2 text-gray-500">Loading...</div>
          ) : isProjectError ? (
            <div className="mt-2 text-red-500">Error: {projectError?.message || "Failed to fetch project name"}</div>
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <Input
                id="org-name"
                value={isEditing ? projectName : project?.name || ""}
                onChange={e => setProjectName(e.target.value)}
                readOnly={!isEditing}
                className="w-[300px]"
              />
              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={updateProject.isPending}>
                    {updateProject.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleEdit}>Edit</Button>
                  <Button onClick={handleDeleteInitiate} variant="destructive" disabled={deleteProject.isPending}>
                    {deleteProject.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Project Deletion</DialogTitle>
            <DialogDescription>
              To delete the project "{project?.name || ""}", please enter the project name below to confirm. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="confirm-name" className="font-medium text-sm">
              Project name
            </Label>
            <Input
              id="confirm-name"
              value={deleteConfirmationName}
              onChange={e => setDeleteConfirmationName(e.target.value)}
              placeholder="Enter project name"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleteProject.isPending || !deleteConfirmationName.trim()}>
              {deleteProject.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectSettings
