import { storageKeys } from "@/shared/constants"
import { getFromSessionStorage, getUserFromLS } from "@/shared/lib/helpers"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { IChatbotProject } from "./types.ts"

export interface IProjectState {
  data: number[]
  projects: IChatbotProject[]
  currentProject: IChatbotProject | null
}

const initialState: IProjectState = {
  data: [],
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
    setProjects: (state, { payload }: PayloadAction<IChatbotProject[]>) => {
      state.projects = payload
    },
    setCurrentProject: (state, { payload }: PayloadAction<IChatbotProject | null>) => {
      state.currentProject = payload
    }
  }
})

export const { setCurrentProject, setProjects } = actions
export default projectReducer
