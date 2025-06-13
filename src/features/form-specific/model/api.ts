import { customBaseQuery } from "@/shared/lib/api"
import { createApi } from "@reduxjs/toolkit/query/react"
import type { ILoginSchema } from "src/pages/auth-specific-pages/log-in"
import type { IAuthResponse } from "./types.ts"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  tagTypes: ["projects"],
  endpoints: builder => ({
    login: builder.mutation<IAuthResponse, ILoginSchema>({
      query: body => ({
        url: "accounts/operator-login/",
        method: "POST",
        body
      })
    })
  })
})

export const { useLoginMutation } = authApi
