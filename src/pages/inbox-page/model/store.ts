import { create } from "zustand"

interface ProjectStore {
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
}

export const useProjectStore = create<ProjectStore>(set => ({
  selectedProjectId: null,
  setSelectedProjectId: id => set({ selectedProjectId: id })
}))
