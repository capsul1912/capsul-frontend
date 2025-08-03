import { getAuthToken } from "@/api/cookies"
import createFetchClient, { type Middleware } from "openapi-fetch"
import createClient from "openapi-react-query"
import type { paths } from "./api"

const baseUrl = (url => {
  if (url.endsWith("/api/v1")) {
    return url.slice(0, url.length - "/api/v1".length)
  }

  return url
})(import.meta.env.VITE_BASE_URL)

export const fetchClient = createFetchClient<paths>({
  baseUrl
})

const authMiddleware: Middleware = {
  async onRequest({ request, options }) {
    // set "foo" header
    // if (config.url === "/auth/registration/" || config.url === "/auth/registration/verify-email/" || config.url === "/auth/login/") {
    //   return config
    // }
    const token = getAuthToken()

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`)
    }

    return request
  }
}

fetchClient.use(authMiddleware)

export const $api = createClient(fetchClient)
