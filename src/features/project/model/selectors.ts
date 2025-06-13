import type { IState } from "@/app/store.ts"

export const selectorCurrentProject = (state: IState) => state.projectReducer.currentProject
