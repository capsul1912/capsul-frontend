import Cookies from "js-cookie"

export const AUTH_TOKEN_KEY = "access_token"
export const REFRESH_TOKEN_KEY = "refresh_token"

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  })
}

export const getCookie = (key: string) => {
  return Cookies.get(key)
}

export const removeCookie = (key: string) => {
  Cookies.remove(key, { path: "/" })
}

export const setAuthTokens = (access: string, refresh: string) => {
  setCookie(AUTH_TOKEN_KEY, access)
  setCookie(REFRESH_TOKEN_KEY, refresh)
}

export const getAuthToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_KEY)
}

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

export const setAuthToken = (token: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 1,
    path: "/",
    ...options
  })
}

export const setRefreshToken = (token: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 7,
    path: "/",
    ...options
  })
}

export const removeAuthTokens = () => {
  removeCookie(AUTH_TOKEN_KEY)
  removeCookie(REFRESH_TOKEN_KEY)
}

export const hasValidToken = (): boolean => {
  const token = getAuthToken()
  return !!token
}
