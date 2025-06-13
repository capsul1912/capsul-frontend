import type { IOrganization } from "@/pages/main/api/use-fetch-organization.ts"
import { create } from "zustand"

type IViewState = "default" | "create" | "settings" | "create-project"

interface IDefaultViewState {
  viewState: IViewState
  isDefaultView: boolean
  isCreateView: boolean
  isSettingsView: boolean
  isCreateProjectView: boolean
}

interface IViewStateActions {
  setViewState: (v: IViewState) => void
  handleCreateProjectClick: () => void
  handleCreateOrgClick: () => void
  handleSettingsClick: () => void
}

type IViewStateType = IDefaultViewState & IViewStateActions

interface IMainPageStore extends IViewStateType {
  // Organization Edit
  organizationInEdit: IOrganization | null
  setOrganizationInEdit: (organization: IOrganization) => void
}

const defaultViewState: IDefaultViewState = {
  viewState: "default",
  isDefaultView: true,
  isCreateView: false,
  isSettingsView: false,
  isCreateProjectView: false
}

export const useMainPageStore = create<IMainPageStore>(set => ({
  // View State
  ...defaultViewState,
  setViewState: v =>
    set({
      viewState: v,
      isDefaultView: v === "default",
      isCreateView: v === "create",
      isSettingsView: v === "settings",
      isCreateProjectView: v === "create-project"
    }),
  handleCreateProjectClick: () =>
    set({
      ...defaultViewState,
      viewState: "create-project",
      isCreateProjectView: true
    }),
  handleCreateOrgClick: () =>
    set({
      ...defaultViewState,
      viewState: "create",
      isCreateView: true
    }),
  handleSettingsClick: () =>
    set({
      ...defaultViewState,
      viewState: "settings",
      isSettingsView: true
    }),

  // Organization Edit
  organizationInEdit: null,
  setOrganizationInEdit: organizationInEdit =>
    set({
      organizationInEdit
    })
}))
