import { accountApi } from "@/features/account/api/account-api.ts"
import { authApi } from "@/features/form-specific/model"
import { issueApi } from "@/features/issue/model"
import { projectApi } from "@/features/project/model"
import projectReducer from "@/features/project/model/slice.ts"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    projectReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [issueApi.reducerPath]: issueApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer
    // [modelsApi.reducerPath]: modelsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      issueApi.middleware,
      authApi.middleware,
      accountApi.middleware
      // modelsApi.middleware,
    )
})

export type IState = ReturnType<typeof store.getState>
export type IDispatch = typeof store.dispatch
export default store
