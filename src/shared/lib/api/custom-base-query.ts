import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, saveAccessToken } from "@/shared/lib/helpers"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: async headers => {
    const token = getAccessToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
    return headers
  }
})

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      removeAccessToken()
      removeRefreshToken()
      // window.location.pathname = '/login';
      return result
    }

    const refreshBody = {
      url: "/accounts/refresh/",
      method: "POST",
      body: {
        refresh: refreshToken
      }
    }

    const refreshResult = await baseQuery(refreshBody, api, extraOptions)

    if (refreshResult.data && typeof refreshResult.data === "object" && "access" in refreshResult.data) {
      const newAccessToken = (refreshResult.data as { access: string }).access
      saveAccessToken(newAccessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      removeAccessToken()
      removeRefreshToken()
      // window.location.pathname = '/login';
    }
  }

  return result
}
