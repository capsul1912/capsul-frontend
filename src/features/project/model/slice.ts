import { storageKeys } from "@/shared/constants"
import { getFromSessionStorage, getUserFromLS } from "@/shared/lib/helpers"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { IChatbotProject } from "./types.ts"

export interface IAppSidebarState {
  isPinned: boolean
}

export interface IProjectState {
  data: number[]
  appSidebar: IAppSidebarState
  projects: IChatbotProject[]
  currentProject: IChatbotProject | null
}

const initialState: IProjectState = {
  data: [],
  appSidebar: {
    isPinned: false
  },
  projects: getUserFromLS()?.projects || [],
  currentProject: getFromSessionStorage(storageKeys.CURRENT_PROJECT)
}

const { reducer: projectReducer, actions } = createSlice({
  name: "userSlice",
  reducerPath: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<number[]>) => {
      state.data = payload
    },
    setAppSidebar: (state, { payload }: PayloadAction<IAppSidebarState>) => {
      state.appSidebar = payload
    },
    setProjects: (state, { payload }: PayloadAction<IChatbotProject[]>) => {
      state.projects = payload
    },
    setCurrentProject: (state, { payload }: PayloadAction<IChatbotProject | null>) => {
      state.currentProject = payload
    }
  }
})

export const { setCurrentProject, setProjects, setAppSidebar } = actions
export default projectReducer
