import { useProjectStore } from "@/pages/inbox-page/model/store"
import { AddProjectIcon, WorkspaceIcon } from "@/shared/icons"
import { tryWithTransition } from "@/shared/lib/helpers"
import { useAuthStore } from "@/shared/lib/store/auth-store.ts"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useFetchProjects } from "../api/use-fetch-project.ts"

function OrganizationCard() {
  // Helpers
  const navigate = useNavigate()

  // Store
  const { setSelectedProjectId } = useProjectStore()
  const { user } = useAuthStore()
  console.log("User:", user)

  // Queries
  const { data: projects, isLoading: projectsLoading } = useFetchProjects({
    // organization: "e9d3d89c-f85b-41cd-83ad-b3826b1c990d"
  })

  // Constants
  const MAX_PROJECTS = 6
  const canCreateProject = (projects?.results?.length ?? 0) < MAX_PROJECTS && user?.role !== "user"

  return (
    <Card className="rounded-3xl shadow-section">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-2">
            <WorkspaceIcon />
          </div>
          <h2 className="font-semibold">Workspace</h2>
        </div>
      </div>

      <div className="p-4">
        {projectsLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} tabIndex={0} className="group cursor-pointer border-none p-4 shadow-none transition duration-75 hover:bg-[#E3EAFD]">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex size-[54px] items-center justify-center rounded-lg border border-[#DEE0E3] bg-[#F7F7F8] font-semibold group-hover:border-[#93AFF6] group-hover:bg-white dark:border-gray-700 dark:bg-neutral-800">
                      <div className="h-4 w-9 animate-pulse rounded-sm rounded-xs bg-zinc-200 duration-1000"></div>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">
                        <div className="h-6 w-20 animate-pulse rounded-sm bg-zinc-200 duration-1000"></div>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        ) : projects?.results?.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.results.map(project => (
              <Card
                key={project.id}
                tabIndex={0}
                onClick={() => {
                  setSelectedProjectId(project.id)
                  tryWithTransition(() => {
                    navigate(`/${project.id}/inbox`)
                  })
                }}
                className="group cursor-pointer border-none p-4 shadow-none transition duration-75 hover:bg-[#E3EAFD]"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex size-[54px] items-center justify-center rounded-lg border border-[#DEE0E3] bg-[#F7F7F8] font-semibold group-hover:border-[#93AFF6] group-hover:bg-white dark:border-gray-700 dark:bg-neutral-800">
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-gray-600 text-sm">{project.collection_name}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <span className="flex justify-center text-md">No projects found for this organization</span>
        )}

        {canCreateProject && (
          <Link to={`/main/create-project`}>
            <Button variant="ghost" className="group mt-4 h-[78px] p-0 hover:bg-transparent active:bg-zinc-20">
              <AddProjectIcon className="!size-[54px]" />
              Create project
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

export default OrganizationCard
