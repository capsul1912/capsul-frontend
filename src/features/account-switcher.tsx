import { type IChatbotProject, setCurrentProject } from "@/features/project/model"
import { storageKeys } from "@/shared/constants"
import { cn, setToSessionStorage } from "@/shared/lib/helpers"
import { useDispatch, useSelector } from "@/shared/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select.tsx"
import { GalleryVerticalEnd } from "lucide-react"
import * as React from "react"

interface AccountSwitcherProps {
  isCollapsed: boolean
}

export function AccountSwitcher({ isCollapsed }: AccountSwitcherProps) {
  // Helper Hooks
  const dispatch = useDispatch()

  // Selectors
  const projects = useSelector(state => state.projectReducer.projects)
  const currentProject = useSelector(state => state.projectReducer.currentProject) || projects[0]

  // States
  const [selectedProject, setSelectedProject] = React.useState<IChatbotProject | null>(currentProject)

  // Queries
  // TODO: GET PROJECT FROM SERVER HERE
  // dispatch(setProjects(res.user.projects));
  // dispatch(setCurrentProject(res.user.projects?.[0]));

  // Functions
  const onValueChange = (id: string) => {
    const found = projects.find(p => p.id === id)
    setSelectedProject(found || null)
    setToSessionStorage(storageKeys.CURRENT_PROJECT, found)
    if (found) dispatch(setCurrentProject(found))
  }

  return (
    <Select defaultValue={selectedProject?.id} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed && "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          {/*{*/}
          {/*    accounts.find(*/}
          {/*        account => account.email === selectedProject*/}
          {/*    )?.icon*/}
          {/*}*/}
          {/*<span className={cn('ml-2', isCollapsed && 'hidden')}>*/}
          {isCollapsed && <GalleryVerticalEnd />}
          <span className={cn("ml2", isCollapsed && "hidden")}>
            {selectedProject?.name}
            {/*{*/}
            {/*    accounts.find(*/}
            {/*        account => account.email === selectedProject*/}
            {/*    )?.label*/}
            {/*}*/}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {projects.map(project => (
          <SelectItem key={project.id} value={project.id}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {/*{account.icon}*/}
              {project.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
